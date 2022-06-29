import { Request, Response } from 'express'
import httpCodes from 'http-status'
import { Todo } from '../@types'
import service from '../services/TodosService'

const index = async (req: Request, res: Response) => {
  let todos: Todo[]
  try {
    todos = await service.getAll()
  } catch (error) {
    return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
      error,
    })
  }

  return res.status(httpCodes.OK).json(todos)
}

const get = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params

  let todo: Todo | undefined
  try {
    todo = await service.get(id)
  } catch (error) {
    return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
      error,
    })
  }

  if (!todo) {
    return res.status(httpCodes.NOT_FOUND).json({
      error: 'todo not found',
    })
  }

  return res.status(httpCodes.OK).json(todo)
}

const create = async (req: Request<object, object, Todo>, res: Response) => {
  const todo = req.body

  if (!todo || !todo.details) {
    return res.status(httpCodes.BAD_REQUEST).json({
      error: 'bad request',
    })
  }

  try {
    await service.create(todo)
  } catch (error) {
    return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
      error,
    })
  }

  return res.status(httpCodes.CREATED).json({
    message: 'success',
  })
}

const update = async (
  req: Request<{ id: string }, object, Todo>,
  res: Response,
) => {
  const { body } = req
  const { id } = req.params

  if (!body || !id) {
    return res.status(httpCodes.BAD_REQUEST).json({
      error: 'bad request',
    })
  }

  const todo = await service.get(id)
  const updatedTodo = { ...todo, ...body }

  try {
    await service.update(updatedTodo)
  } catch (error) {
    return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
      error,
    })
  }

  return res.status(httpCodes.OK).json({
    message: 'success',
    todo,
  })
}

const remove = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params

  try {
    await service.remove(id)
  } catch (error) {
    return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
      error,
    })
  }

  return res.status(httpCodes.OK).json({
    message: 'success',
  })
}

const assign = async (
  req: Request<{ id: string; user_id: string }>,
  res: Response,
) => {
  const { id } = req.params
  const userId = req.params.user_id

  try {
    await service.assign(id, userId)
  } catch (error) {
    return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
      error,
    })
  }

  return res.status(httpCodes.OK).json({
    message: 'success',
  })
}

export default {
  index,
  get,
  create,
  update,
  remove,
  assign,
}
