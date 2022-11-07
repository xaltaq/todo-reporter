import * as core from '@actions/core'
import * as github from '@actions/github'
import {
  ActionConfig,
  TaskLink,
  TaskState,
  TodoCollection,
  TodoFile
} from './structures.mjs'

export default async function render(
  actionConfig: ActionConfig,
  todosSize: number,
  todoCollection: TodoCollection
): Promise<void> {
  const summary = core.summary
    .addHeading('TODO Report', 1)
    .addRaw(
      `Found ${todosSize} TODOs in ${todoCollection.todosByFiles.length} files, linking to ${todoCollection.todosByTasks.length} tasks.`
    )

  if (actionConfig.reportPerTask) {
    summary.addHeading('TODOs by Task', 2)
    for (const todo of todoCollection.todosByTasks) {
      summary.addHeading(taskLink(todo.link), 3).addTable([
        [
          {data: 'Tag', header: true},
          {data: 'Comment', header: true},
          {data: 'File', header: true}
        ],
        ...todo.locations.map(location => [
          location.tag,
          location.comment,
          locationLink(location.file, false)
        ])
      ])
    }
  }

  if (actionConfig.reportPerFile) {
    summary.addHeading('TODOs by File', 2)
    for (const todo of todoCollection.todosByFiles) {
      summary.addHeading(locationLink(todo.file, false), 3).addTable([
        [
          {data: 'Line', header: true},
          {data: 'Tag', header: true},
          {data: 'Task', header: true},
          {data: 'Comment', header: true}
        ],
        ...todo.locations.map(location => [
          locationLink(location.file, true),
          location.tag,
          taskLink(location.link),
          location.comment
        ])
      ])
    }
  }

  await summary.write()
}

function taskLink(link: TaskLink): string {
  if (link.owner && link.repo && link.id) {
    const theLink = `<a href="https://github.com/${link.owner}/${link.repo}/issues/${link.id}">${link.task}</a>`
    return link.state === TaskState.CLOSED ? `<s>${theLink}</s>` : theLink
  }

  if (!link.task) {
    return '(none)'
  }

  return link.task
}

function locationLink(file: TodoFile, onlyLine: boolean): string {
  const lineAnchor = file.line ? `#L${file.line}` : ''
  let lineText = '?'
  if (!onlyLine) {
    lineText = `${file.path}${lineAnchor}`
  } else if (file.line) {
    lineText = lineAnchor
  }
  return `<a href="https://github.com/${github.context.repo.owner}/${github.context.repo.repo}/blob/${github.context.sha}/${file.path}${lineAnchor}">${lineText}</a>`
}
