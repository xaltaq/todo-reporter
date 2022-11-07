import _ from 'lodash'
import * as core from '@actions/core'
import * as github from '@actions/github'
import {
  TaskLink,
  TaskState,
  TodoCollection,
  TodoFile,
  TodosByFile,
  TodosByTask,
  TodoTask
} from './structures.mjs'
import {mapLimit} from 'async'
import {GitHub} from '@actions/github/lib/utils.js'
import {TodoComment} from '../node_modules/leasot/dist/definitions.js'
import {sortTodosByFile, sortTodosByTask, sortTodoTasksByFile} from './sorters.mjs'

const CONCURRENCY_LIMIT = 5

export default async function collectTasks(
  octokit: InstanceType<typeof GitHub>,
  allTodos: TodoComment[]
): Promise<TodoCollection> {
  const todosByTasks = await groupTodosByTask(octokit, allTodos)
  const todosByFiles = groupTodosByFile(
    todosByTasks.flatMap(todo => todo.locations)
  )
  return {
    todosByTasks,
    todosByFiles
  }
}

async function groupTodosByTask(
  octokit: InstanceType<typeof GitHub>,
  allTodos: TodoComment[]
): Promise<TodosByTask[]> {
  const taskStringToTodos = _.groupBy(allTodos, todo => todo.ref)
  const tasksToTodos = await mapLimit(
    Object.entries(taskStringToTodos),
    CONCURRENCY_LIMIT,
    async ([task, todos]: [string, TodoComment[]]) => {
      const taskLink = getTaskLinkFromTask(task)
      taskLink.state = await getTaskState(octokit, taskLink)
      return {
        link: taskLink,
        locations: todos
          .map(todo => createTask(todo, taskLink))
          .sort(sortTodoTasksByFile)
      }
    }
  )
  return tasksToTodos.sort(sortTodosByTask)
}

function groupTodosByFile(allTodos: TodoTask[]): TodosByFile[] {
  const fileStringToTodos = _.groupBy(allTodos, todo => todo.file.path)
  return Object.entries(fileStringToTodos)
    .map(([path, todos]) => {
      const file: TodoFile = {path}
      return {
        file,
        locations: todos.sort(sortTodoTasksByFile)
      }
    })
    .sort(sortTodosByFile)
}

function getTaskLinkFromTask(task: string): TaskLink {
  const taskLink: TaskLink = {task, state: TaskState.UNKONWN}

  const repoTask = task.match(/^(?:GH-|#)(\d+)$/)
  if (repoTask) {
    return Object.assign(taskLink, {
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      id: parseInt(repoTask[1])
    })
  }

  const githubTask = task.match(/^(\S+)\/(\S+)#(\d+)$/)
  if (githubTask) {
    return Object.assign(taskLink, {
      owner: githubTask[1],
      repo: githubTask[2],
      id: parseInt(githubTask[3])
    })
  }

  return taskLink
}

async function getTaskState(
  octokit: InstanceType<typeof GitHub>,
  taskLink: TaskLink
): Promise<TaskState> {
  if (!taskLink.owner || !taskLink.repo || !taskLink.id) {
    return TaskState.UNKONWN
  }

  try {
    const response = await octokit.rest.issues.get({
      owner: taskLink.owner,
      repo: taskLink.repo,
      issue_number: taskLink.id
    })
    return response.data.state === 'open' ? TaskState.OPEN : TaskState.CLOSED
  } catch (err) {
    core.warning(err as Error)
    return TaskState.UNREACHABLE
  }
}

function createTask(todo: TodoComment, taskLink: TaskLink): TodoTask {
  return {
    tag: todo.tag,
    comment: todo.text,
    link: taskLink,
    file: {
      path: todo.file,
      line: todo.line
    }
  }
}
