import * as Yup from 'yup'

class ProductController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category: Yup.string().required(),
    })

    const { name, price, category } = request.body

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json(error.errors)
    }

    const newProduct = {
      name,
      price,
      category,
    }

    return response.status(201).json(newProduct)
  }
}

export default ProductController
