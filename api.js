const axios = require('axios')

const api = axios.create({
  baseURL: 'http://corona-virus-status.herokuapp.com/'
})

module.exports = api