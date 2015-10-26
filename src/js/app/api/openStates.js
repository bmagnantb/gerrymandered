import axios from 'axios'

export function getMetadata() {
  return axios.get('/openstates/metadata')
}

export default {
  getMetadata
}
