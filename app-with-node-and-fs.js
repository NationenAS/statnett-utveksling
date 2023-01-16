const express = require('express')
const cors = require('cors')
const fs = require('fs')
const app = express()
const port = 3000

app.use(cors({
    origin: '*'
}))

app.get('/', (req, res) => {
    fetch("https://driftsdata.statnett.no/restapi/Physicalflow/GetData?From=2023-01-01")
        .then(r => r.json())
        .then(d => {
            let dataString = JSON.stringify(d)
            fs.writeFile('balance.json', dataString, err => {
                if (err) console.error(err)
                else {
                    console.log("JSON file written successfully.")
                    res.send(d)
                }
            })
        })
        .catch(e => { console.log(e) })
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})