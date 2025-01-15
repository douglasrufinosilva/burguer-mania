import { Router } from 'express'
import { v4 } from 'uuid'
import User from './app/models/User'

const routes = Router()

routes.get('/', async (req, res) => {
  const user = await User.create({
    id: v4(),
    name: 'Douglas',
    email: 'doug@mail.com',
    password_hash: 'asjldj84lajd',
  })

  res.status(200).json(user)
})

export default routes
