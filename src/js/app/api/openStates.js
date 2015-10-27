import axios from 'axios'

export function getMetadata() {
  return axios.get('/openstates/metadata').then(({data}) => data)
}

export default {
  getMetadata
}
