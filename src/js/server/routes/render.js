import express from 'express'

import { prod, dev } from '../templates'

var router = express.Router()

router.get('/', (req, res) => {
  process.env.NODE_ENV === 'development' ? res.send(dev) : res.send(prod)
})

export default router
