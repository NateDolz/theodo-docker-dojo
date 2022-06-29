import { Router } from 'express'
import TodosController from '../controllers/TodosController'

const router = Router()

router.get('/ping', (req, res) =>
  res.json({
    message: 'pong',
  }),
)

router.get('/', TodosController.index)

router.get('/:id', TodosController.get)

router.post('/', TodosController.create)

router.put('/:id', TodosController.update)

router.delete('/:id', TodosController.remove)

router.patch('/:id/assign/:user_id', TodosController.assign)

export default router
