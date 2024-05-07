const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "__cf_bm=NI2R.wzPAx5aRlqJC9QuVjlFoSTsOeGkNS0SUvj8Xx8-1714412146-1.0.1.1-OxrshZPI7q4Z9MnEGeMmtywiKoICBxv4OpBk_a16IsWzkAY31jyk_lSuRxI9aK3UeSuz_W2zPj2rguEPxtCV6Hhi2qDoOlWoR8u6RQ4OWtU; _cfuvid=RPHmnpfmCcnuLvU2noBz4zQhP.0hx2YztEKsaWLRKis-1714412146248-0.0.1.1-604800000; cf_clearance=kVHJjOF34LCESVazJSquqS9.9rYWpJa_s5mxCH57m84-1714412148-1.0.1.1-mBj9aQjFs1neX7qUEMepd_8IhuPbxP0KCIEjYkiGp0.bIqZIE0BlmkAMA4edf9N899unS16KRQjkX9NiE8lIpA; sessionId=e26257d4-106d-4a2f-a22d-28b2ddb3d2e4; allowCookies=true; JSESSIONID=8BA43F552D360D15A39AC6E15010F32C");

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

for (let index = 0; index < 2; index++) {
    fetch("https://www.zonaprop.com.ar/rplis-api/postings", getReqOptions(index))
    .then((response) => {
        return response.text()
    })
    .then((result) => {
        console.log(result)
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

function postings (r) {
    return r.listPostings.map((res) => {
        const prices = res.priceOperationTypes.filter((x) => x.operationType.operationTypeId === "2")[0].prices;
        const location = res.postingLocation.location

        return {
            id: res.postingId,
            priceCurrency: prices[0].currency,
            priceAmount: prices[0].amount,
            location: location.label === "BARRIO" ? location.name : (location.parent.name) 
        }
    })
}