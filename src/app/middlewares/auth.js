import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

export default (request, response, next) => {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).json({
      error: 'Token não informado!',
    })
  }

  const token = authToken.split(' ')[1]

  try {
    jwt.verify(token, authConfig.secret, function (error, decoded) {
      if (error) {
        throw new Error()
      }

      request.userId = decoded.id

      return next()
    })
  } catch (error) {
    return response.status(401).json({
      message: 'Token Inválido!',
    })
  }
}
