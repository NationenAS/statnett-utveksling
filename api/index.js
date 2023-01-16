export default async function handler(req, res) {
    res.setHeader('Cache-Control', 's-maxage=86400')
    fetch("https://driftsdata.statnett.no/restapi/Physicalflow/GetData?From=2023-01-01")
        .then(r => r.json())
        .then(d => {
            let data = {
                retrieved: Date.now(),
                data: d
            }
            res.send(data)
        })
        .catch(e => { console.log(e) })
}