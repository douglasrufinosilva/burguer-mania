import * as Yup from 'yup'
import Category from '../models/Category'

class CategoryController {
  async store(request, response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
      })

      try {
        await schema.validateSync(request.body, { abortEarly: false })
      } catch (err) {
        return response.status(400).json({ error: err.erros })
      }

      const { name } = request.body

      const newCategory = await Category.create({
        name,
      })

      return response.status(201).json(newCategory)
    } catch (err) {
      console.log(err)
    }
  }

  async index(request, response) {
    try {
      const showAllCategories = await Category.findAll()

      return response.status(200).json(showAllCategories)
    } catch (err) {
      console.log(err)
    }
  }
}

export default CategoryController
