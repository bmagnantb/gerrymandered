import express from 'express'
import axios from 'axios'

var apiKey = process.env.OPEN_STATES_KEY || require('config').get('openStatesApiKey')

const buildOpenStatesUrl = string => `http://openstates.org/api/v1/${string}/?apikey=${apiKey}`
var router = express.Router()

router.get('/metadata', (req, res) => {
  axios.get(buildOpenStatesUrl(`/metadata`))
    .then(({data}) => res.send(data))
})

export default router
