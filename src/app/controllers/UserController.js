import { v4 } from 'uuid'
import User from '../models/User'

class UserController {
  async store(request, response) {
    const { name, email, password_hash, admin } = request.body

    const newUser = await User.create({
      id: v4(),
      name,
      email,
      password_hash,
      admin,
    })

    return response.status(201).json({
      id: newUser.id,
      name,
      email,
      admin,
    })
  }
}

export default UserController
