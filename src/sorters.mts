import * as github from '@actions/github'
import {
  TaskLink,
  TodoFile,
  TodosByFile,
  TodosByTask,
  TodoTask
} from './structures.mjs'

export function sortTodosByTask(a: TodosByTask, b: TodosByTask): number {
  return sortTaskLinks(a.link, b.link)
}

export function sortTodosByFile(a: TodosByFile, b: TodosByFile): number {
  return sortTodoFiles(a.file, b.file)
}

export function sortTodoTasksByFile(a: TodoTask, b: TodoTask): number {
  return sortTodoFiles(a.file, b.file)
}

function sortTodoFiles(a: TodoFile, b: TodoFile): number {
  return a.path.localeCompare(b.path) || (a.line ?? 0) - (b.line ?? 0)
}

function sortTaskLinks(a: TaskLink, b: TaskLink): number {
  const aInRepo =
    a.owner === github.context.repo.owner && a.repo === github.context.repo.repo
  const bInRepo =
    b.owner === github.context.repo.owner && b.repo === github.context.repo.repo
  if (aInRepo !== bInRepo) {
    return -Number(aInRepo) - -Number(bInRepo)
  }
  if (aInRepo && bInRepo && a.id !== undefined && b.id !== undefined) {
    return a.id - b.id
  }

  const aOnGithub = a.owner !== undefined && a.repo !== undefined
  const bOnGithub = b.owner !== undefined && b.repo !== undefined
  if (aOnGithub !== bOnGithub) {
    return -Number(aOnGithub) - -Number(bOnGithub)
  }
  if (aOnGithub && bOnGithub && a.id !== undefined && b.id !== undefined) {
    return a.owner!.localeCompare(b.owner!) || a.repo!.localeCompare(b.repo!)
  }

  return a.task.localeCompare(b.task)
}
