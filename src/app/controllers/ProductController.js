import * as Yup from 'yup'
import Product from '../models/Products'

class ProductController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category: Yup.string().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json(error.errors)
    }

    const { filename: path } = request.file
    const { name, price, category } = request.body

    const newProduct = await Product.create({
      name,
      price,
      category,
      path,
    })

    return response.status(201).json(newProduct)
  }

  async index(request, response) {
    const products = await Product.findAll()

    console.log(request.userId)

    return response.status(200).json(products)
  }
}

export default ProductController
