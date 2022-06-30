import axios from 'axios'
import knex from 'knex'
import dotenv from 'dotenv'
import { Todo, User } from '../@types'

dotenv.config()

const connection = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  database: process.env.DB_NAME,
}

const dbClient = knex({
  client: 'pg',
  connection,
})

const userClient = axios.create({
  baseURL: process.env.USERS_SERVICE,
})

const getAll = async () => dbClient<Todo>('todos')

const get = async (id: string) =>
  dbClient<Todo>('todos').where('id', '=', id).first()

const create = async (todo: Todo) => dbClient<Todo>('todos').insert(todo)

const update = async (todo: Todo) =>
  dbClient<Todo>('todos')
    .update({
      details: todo.details,
      assigned_to: todo.assigned_to,
      completed: todo.completed,
    })
    .where({ id: todo.id })

const remove = async (id: string) =>
  dbClient<Todo>('todos').delete().where('id', '=', id)

const assign = async (id: string, userId: string) => {
  const todo = await get(id)

  if (!todo) throw new Error(`todo ${id} not found`)

  const user = await userClient.get<User>(`/users/${userId}`)

  if (user.status > 201 || !user.data)
    throw new Error(`user ${userId} not found`)

  todo.assigned_to = userId

  await update(todo)
}

export default {
  getAll,
  get,
  create,
  update,
  remove,
  assign,
}
