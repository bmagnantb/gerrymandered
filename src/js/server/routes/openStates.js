import express from 'express'
import axios from 'axios'
import config from 'config'

const buildOpenStatesUrl = string => `http://openstates.org/api/v1/${string}/?${config.get('openStatesApiKey')}`
var router = express.Router()

router.get('/metadata', (req, res) => {
  axios.get(buildOpenStatesUrl(`/metadata`))
    .then(({data}) => res.send(data))
    .catch(({status, statusText}) => console.log(status, statusText))
})

export default router
