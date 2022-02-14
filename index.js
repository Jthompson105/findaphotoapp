const express = require("express")
const Datastore = require("nedb")

const app = express()
app.use(express.static('Client'))
app.use(express.json())

const database = new Datastore('database.db')
database.loadDatabase()

app.post('/api', (req, res) => {
  const data = req.body;
  console.log(req.body)
  const timestamp = Date.now()
  data.timestamp = timestamp
  database.insert(data)
  res.json(data)

})

app.get('/api', (req, res) => {
  database.npm({}, (err, data) => {
    if (err) res.status(500).send("no data found")
    res.json(data)
  })
})

app.listen(3000, () => console.log('listening on 3000'))