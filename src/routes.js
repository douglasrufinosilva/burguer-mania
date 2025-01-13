const { Router } = require('express');

const routes = Router()

routes.get('/', (req, res) => {
  res.status(200).json({ messade: 'ok aqui' })
})

module.exports = routes