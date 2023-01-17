let cachedData = {
    retrieved: 0
}
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')
    // Enable cache
    res.setHeader('Cache-Control', 's-maxage=3600')
    // If more than 1 hour old
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