import { Router } from 'express'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProductController from './app/controllers/ProductController'

const userController = new UserController()
const sessionController = new SessionController()
const productController = new ProductController()

const routes = Router()

// rota de usuários
routes.post('/users', userController.store)

// rota de login
routes.post('/session', sessionController.store)

// rota de produtos
routes.post('/products', productController.store)

export default routes
