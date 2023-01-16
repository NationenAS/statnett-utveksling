export default async function handler(req, res) {
    fetch("https://driftsdata.statnett.no/restapi/Physicalflow/GetData?From=2023-01-01")
        .then(r => r.json())
        .then(d => {
            res.send(d)
        })
        .catch(e => { console.log(e) })
}