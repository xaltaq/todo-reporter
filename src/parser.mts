import {
  ExtensionsDb,
  TodoComment
} from '../node_modules/leasot/dist/definitions.js'
import path, {extname} from 'path'
import {ActionConfig} from './structures.mjs'
import {mapLimit} from 'async'
import {readFileSync} from 'fs'
import {associateExtWithParser} from 'leasot'

type Leasot = typeof import('leasot')
const CONCURRENCY_LIMIT = 50

export default async function parse(
  actionConfig: ActionConfig
): Promise<TodoComment[]> {
  const leasot = await prepareParser(actionConfig)
  const globby = await import('globby')
  const files = globby.globbySync(actionConfig.files, {
    ignore: actionConfig.ignore
  })
  const todos = await mapLimit(
    files,
    CONCURRENCY_LIMIT,
    async (filename: string) => getTodosFromFile(leasot, actionConfig, filename)
  )
  return todos.flat()
}

async function prepareParser(actionConfig: ActionConfig): Promise<Leasot> {
  const extensions: ExtensionsDb = {}
  for (const db of actionConfig.associateParser) {
    const [ext, parser] = db.split(',')
    extensions[ext] = {parserName: parser}
  }

  /* eslint-disable-next-line import/no-unresolved */
  const leasot = await import('leasot')
  associateExtWithParser(extensions)
  return leasot
}

async function getTodosFromFile(
  leasot: Leasot,
  actionConfig: ActionConfig,
  filename: string
): Promise<TodoComment[]> {
  const extension = extname(filename)
  if (!leasot.isExtensionSupported(extension)) {
    return actionConfig.skipUnsupported
      ? []
      : Promise.reject(new Error(`Filetype ${extension} is unsupported`))
  }

  const contents = readFileSync(path.resolve(process.cwd(), filename), 'utf8')
  return leasot.parse(contents, {
    customTags: actionConfig.tags,
    extension,
    filename
  })
}
