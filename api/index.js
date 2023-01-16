let cachedData = {
    retrieved: 0
}
export default async function handler(req, res) {
    res.setHeader('Cache-Control', 's-maxage=3600')
    // Hvis mer enn en time gammel
    if ((Date.now() - cachedData.retrieved) > 3600000 || typeof cachedData.error !== 'undefined') {
        fetch("https://driftsdata.statnett.no/restapi/Physicalflow/GetData?From=2023-01-01")
            .then(r => r.json())
            .then(d => {
                cachedData = {
                    retrieved: Date.now(),
                    fromCache: false,
                    data: d
                }
                res.send(cachedData)
            })
            .catch(e => { 
                cachedData.error = e
                res.send(cachedData)
            })
    }
    else {
        cachedData.fromCache = true
        res.send(cachedData)
    }
}