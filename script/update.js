const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "__cf_bm=dQqc9C0g_E.EADpa2rFKbYXMnhzFNQaJfe4td2Jf6bQ-1708368280-1.0-AcuKCByUZol/rIcxQ1hWpZfh0lGccOFg7jpXA7qZCxnK9NLVJxg6iz6wkKTNwcXJPXrktiS05uwNMh4SiWHxVk0ItbxDW1z5gtznrUsdbsbe; JSESSIONID=29E39BFDCBB53752222FFD58CC166EFF");

const raw = {
  "q": null,
  "direccion": null,
  "moneda": 2,
  "preciomin": null,
  "preciomax": null,
  "services": "",
  "general": "",
  "searchbykeyword": "",
  "amenidades": "",
  "caracteristicasprop": null,
  "comodidades": "",
  "disposicion": null,
  "roomType": "",
  "outside": "",
  "areaPrivativa": "",
  "areaComun": "",
  "multipleRets": "",
  "tipoDePropiedad": "2,1,2001",
  "subtipoDePropiedad": null,
  "tipoDeOperacion": "2",
  "garages": null,
  "antiguedad": null,
  "expensasminimo": null,
  "expensasmaximo": null,
  "habitacionesminimo": 0,
  "habitacionesmaximo": 0,
  "ambientesminimo": 0,
  "ambientesmaximo": 0,
  "banos": null,
  "superficieCubierta": 1,
  "idunidaddemedida": 1,
  "metroscuadradomin": null,
  "metroscuadradomax": null,
  "tipoAnunciante": "ALL",
  "grupoTipoDeMultimedia": "",
  "publicacion": null,
  "sort": "relevance",
  "etapaDeDesarrollo": "",
  "auctions": null,
  "polygonApplied": null,
  "idInmobiliaria": null,
  "excludePostingContacted": "",
  "banks": "",
  "places": "",
  "condominio": "",
  "city": null,
  "province": "6",
  "zone": null,
  "valueZone": null,
  "subZone": null,
  "coordenates": null
};

const getReqOptions = (index) => {
    var body = raw;
    body.pagina = index;
    return {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
        redirect: "follow"
    };
}

const csvWriter = createCsvWriter({
    path: 'file.csv',
    header: [
        {id: 'id', title: 'ID'},
        {id: 'priceCurrency', title: 'CURRENCY'},
        {id: 'priceAmount', title: 'AMOUNT'},
        {id: 'location', title: 'LOCATION'}
    ]
});

// const repetidos = [45142505, 53119475, 53109035, 52965173, 53067406, 52912435, 53120236, 53120357, 51103898, 50095498, 49884886, 41192116, 45618429, 52824271, 52824272, 53032266, 53032273, 53004244, 53115924]

for (let index = 750; index < 1000; index++) {
    fetch("https://www.zonaprop.com.ar/rplis-api/postings", getReqOptions(index))
    .then((response) => {
        return response.text()
    })
    .then((result) => {
        const r = JSON.parse(result)

        var results = r.listPostings.filter((x) => !repetidos.includes(parseInt(x.postingId))).map((res) => {
            const prices = res.priceOperationTypes.filter((x) => x.operationType.operationTypeId === "2")[0].prices;
            const location = res.postingLocation.location

            return {
                id: res.postingId,
                priceCurrency: prices[0].currency,
                priceAmount: prices[0].amount,
                location: location.label === "BARRIO" ? location.name : (location.parent.name) 
            }
        })

        csvWriter.writeRecords(results)       // returns a promise
        .then(() => {
            console.log(results)
            console.log('...Done');
        });

        })
    .catch((error) => console.error(error));

    
}