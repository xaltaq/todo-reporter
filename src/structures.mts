export enum TaskEnforcement {
  OPEN_IN_REPO,
  ANY_IN_REPO,
  OPEN_ON_GITHUB,
  ANY_ON_GITHUB,
  ANY_PRESENT,
  NO_TODOS,
  NO_ENFORCEMENT
}

export interface ActionConfig {
  token: string
  files: string[]
  ignore: string[]
  tags: string[]
  associateParser: string[]
  skipUnsupported: boolean
  taskEnforcement: TaskEnforcement
  reportPerTask: boolean
  reportPerFile: boolean
}

export enum TaskState {
  UNKONWN,
  OPEN,
  CLOSED,
  UNREACHABLE
}

export interface TaskLink {
  task: string
  owner?: string
  repo?: string
  id?: number
  state: TaskState
}

export interface TodoFile {
  path: string
  line?: number
}

export interface TodoTask {
  tag: string
  comment: string
  link: TaskLink
  file: TodoFile
}

export interface TodosByTask {
  link: TaskLink
  locations: TodoTask[]
}

export interface TodosByFile {
  file: TodoFile
  locations: TodoTask[]
}

export interface TodoCollection {
  todosByTasks: TodosByTask[]
  todosByFiles: TodosByFile[]
}
