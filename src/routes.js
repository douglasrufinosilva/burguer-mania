import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProductController from './app/controllers/ProductController'
import CategoryController from './app/controllers/CategoryController'

import authMiddleware from './app/middlewares/auth'

const userController = new UserController()
const sessionController = new SessionController()
const productController = new ProductController()
const categoryController = new CategoryController()

const upload = multer(multerConfig)
const routes = Router()

// rota de usuários
routes.post('/users', userController.store)

// rota de login
routes.post('/session', sessionController.store)

// rota de produtos
routes.use(authMiddleware)

routes.get('/categories', categoryController.index)
routes.post('/categories', categoryController.store)

routes.get('/products', productController.index)
routes.post('/products', upload.single('file'), productController.store)

export default routes
