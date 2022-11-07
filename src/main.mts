import * as core from '@actions/core'
import * as github from '@actions/github'
import {ActionConfig, TaskEnforcement} from './structures.mjs'
import collectTasks from './task-collector.mjs'
import parse from './parser.mjs'
import render from './renderer.mjs'
import annotateTodos from './annotator.mjs'

async function run(): Promise<void> {
  try {
    const actionConfig: ActionConfig = {
      token: core.getInput('token', {required: true}),
      files: core.getMultilineInput('files', {required: true}),
      ignore: core.getMultilineInput('ignore'),
      tags: core.getMultilineInput('tags'),
      associateParser: core.getMultilineInput('associate_parser'),
      skipUnsupported: core.getBooleanInput('skip_unsupported', {
        required: true
      }),
      taskEnforcement:
        TaskEnforcement[
          core
            .getInput('task_enforcement', {required: true})
            .toUpperCase() as keyof typeof TaskEnforcement
        ],
      reportPerTask: core.getBooleanInput('report_per_task', {required: true}),
      reportPerFile: core.getBooleanInput('report_per_file', {required: true})
    }

    const octokit = github.getOctokit(actionConfig.token)
    const allTodos = await parse(actionConfig)
    const taskCollection = await collectTasks(octokit, allTodos)
    await render(actionConfig, allTodos.length, taskCollection)
    const allSuccess = annotateTodos(actionConfig, taskCollection)
    if (!allSuccess) {
      core.setFailed('Errors occurred when analyzing TODOs')
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
