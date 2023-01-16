let cachedData = {
    retrieved: 0,
    delivered: 0,
    data: {}
}
export default async function handler(req, res) {
    res.setHeader('Cache-Control', 's-maxage=3600')
    // Hvis mer enn en time gammel
    if ((Date.now() - cachedData.retrieved) > 3600000 || typeof cachedData.error !== 'undefined') {
        fetch("https://driftsdata.statnett.no/restapi/Physicalflow/GetData?From=2023-01-01")
            .then(r => r.json())
            .then(d => {
                res.send(d)
                cachedData = {
                    retrieved: Date.now(),
                    delivered: 0,
                    data: d
                }
            })
            .catch(e => { 
                cachedData.error = e
                res.send(cachedData)
            })
    }
    else {
        cachedData.delivered++
        res.send(cachedData)
    }
}