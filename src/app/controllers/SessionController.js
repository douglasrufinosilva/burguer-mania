import * as Yup from 'yup'
import User from '../models/User'

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    })

    const userEmailOrPasswordIncorrect = () => {
      return response.status(401).json({
        error: 'E-mail ou senha inválidos.',
      })
    }

    if (!(await schema.isValid(request.body))) {
      return userEmailOrPasswordIncorrect()
    }

    const { email, password } = request.body

    const user = await User.findOne({
      where: { email },
    })

    if (!user) {
      return userEmailOrPasswordIncorrect()
    }

    if (!(await user.checkPassword(password))) {
      return userEmailOrPasswordIncorrect()
    }

    return response.json({
      id: user.id,
      email: user.email,
      name: user.name,
      admin: user.admin,
    })
  }
}

export default SessionController
