export default async function handler(req, res) {
    
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')
    
    // Enable cache
    res.setHeader('Cache-Control', 's-maxage=14400') // 4 hours

    let countries = [ "se", "dk", "en", "de" ]
    let from = "2023-01-01"
    let urlBase = "https://driftsdata.statnett.no/restapi/Physicalflow/GetData?From="
    let urls = countries.map(c => urlBase + from + "&Country=" + c)
    let responses = []

    Promise.all(urls.map(url => {
        fetch(url)
        .then(resp => resp.json())
        .then(data => responses.push(data))
    }))
    .then(res.send(responses))
}