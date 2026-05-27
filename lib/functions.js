const axios = require('axios')

async function fetchJson(url, options = {}) {

  try {

    const res = await axios({
      method: 'GET',
      url,
      ...options
    })

    return res.data

  } catch (e) {

    return e

  }

}

module.exports = {
  fetchJson
}