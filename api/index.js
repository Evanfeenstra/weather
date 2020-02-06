const fetch = require('node-fetch')

const root = 'https://api.darksky.net/forecast'

const key = '45236e8510745ee86684a5946eda8cda'

module.exports = async function(req, res) {
  const {lat, lon} = req.query
  try {
    const url = `${root}/${key}/${lat},${lon}`
    const r = await fetch(url)
    const json = await r.json()
    res.status(200).send(json)
  } catch(e) {
    res.status(500).send('fail: '+e.message)
  }
}
