const fetch = require('node-fetch')

const root = 'https://api.darksky.net/forecast'

const key = '45236e8510745ee86684a5946eda8cda'

module.exports = async function(req, res) {
  const {lat, lon} = req.query
  try {
    const url = `${root}/${key}/${lat},${lon}`
    console.log(url)
    const r = await fetch(url)
    const json = await r.json()
    res.status(200).send(json)
  } catch(e) {
    res.status(500).send('fail: '+e.message)
  }
}

/*

curl "https://weatherchart-k5e6f1e2s.now.sh/api?lat=47.6062&lon=-122.3321"

*/