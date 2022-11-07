import * as core from '@actions/core'
import * as github from '@actions/github'
import {
  ActionConfig,
  TaskEnforcement,
  TaskState,
  TodoCollection,
  TodosByTask
} from './structures.mjs'

export default function annotateTodos(
  actionConfig: ActionConfig,
  todoCollection: TodoCollection
): boolean {
  return todoCollection.todosByTasks.reduce(
    (success, todosByTask) =>
      reportErrors(actionConfig, todosByTask) && success,
    true
  )
}

function reportErrors(
  actionConfig: ActionConfig,
  todosByTask: TodosByTask
): boolean {
  const taskOpened = todosByTask.link.state === TaskState.OPEN
  const taskExists = taskOpened || todosByTask.link.state === TaskState.CLOSED
  const inRepo =
    todosByTask.link.owner === github.context.repo.owner &&
    todosByTask.link.repo === github.context.repo.repo
  const onGithub =
    todosByTask.link.owner !== null &&
    todosByTask.link.repo !== null &&
    todosByTask.link.id !== null

  let error: string | null
  switch (actionConfig.taskEnforcement) {
    case TaskEnforcement.OPEN_IN_REPO:
      error =
        taskOpened && inRepo
          ? null
          : 'Task must be opened and exist in the repo'
      break
    case TaskEnforcement.ANY_IN_REPO:
      error = taskExists && inRepo ? null : 'Task must exist in the repo'
      break
    case TaskEnforcement.OPEN_ON_GITHUB:
      error =
        taskOpened && onGithub
          ? null
          : 'Task must be opened and exist on GitHub'
      break
    case TaskEnforcement.ANY_ON_GITHUB:
      error = taskExists && onGithub ? null : 'Task must exist on GitHub'
      break
    case TaskEnforcement.ANY_PRESENT:
      error =
        todosByTask.link.task.trim() !== '' ? null : 'Task must be present'
      break
    case TaskEnforcement.NO_TODOS:
      error = 'TODO must be removed'
      break
    case TaskEnforcement.NO_ENFORCEMENT:
      error = null
      break
  }

  if (error !== null) {
    for (const todo of todosByTask.locations) {
      core.error(error, {
        title: 'TODO Failure',
        file: todo.file.path,
        startLine: todo.file.line
      })
    }
    return false
  }

  return true
}
