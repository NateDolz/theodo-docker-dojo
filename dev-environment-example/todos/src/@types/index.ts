export interface User {
  id: number | string
  first_name: string
  last_name: string
  email: string
}

export interface Todo {
  id: number | string
  assigned_to?: number | string
  details: string
  completed: boolean
}
