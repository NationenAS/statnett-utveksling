export default async function handler(req, res) {
    
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')
    
    // Enable cache
    res.setHeader('Cache-Control', 's-maxage=14400') // 4 hours

    const countries = [ "se", "dk", "en", "de", "" ]
    let from = "2024-01-01"
    req.body && req.body.from && (from = req.body.from)
    req.query && req.query.from && (from = req.query.from)
    const urlBase = "https://driftsdata.statnett.no/restapi/Physicalflow/GetData?From="
    const urls = countries.map(c => urlBase + from + "&Country=" + c)
    let requests = urls.map(url => fetch(url))
    
    Promise.all(requests)
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(data => res.send(data))

}
