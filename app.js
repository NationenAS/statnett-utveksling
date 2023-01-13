const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors({
    origin: '*'
}))

app.get('/', (req, res) => {
    fetch("https://driftsdata.statnett.no/restapi/Physicalflow/GetData?From=2023-01-01")
        .then(r => r.json())
        .then(d => {
            res.send(d)
            console.log("Accessed")
        })
        .catch(e => { console.log(e) })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})