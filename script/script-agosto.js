const puppeteer = require('puppeteer');
const fs = require('fs');


function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

async function pagina(page, i) {

    const ids = await page.$$('div.listing__item a')

    // console.log(ids)

    let resultIds = await Promise.all(ids.map(async (t) => {
        return await t.evaluate(x => x.getAttribute('data-item-card'));
    }))

    let resultPrice = await Promise.all(ids.map(async (t) => {
        return await t.evaluate(x => x.getAttribute('data-track-montooperacion'));
    }))

    // console.log(resultIds)
    // console.log(resultPrice)

    const currency = await page.$$('div.listing__item .card__currency')

    let resultCurrency = await Promise.all(currency.map(async (t) => {
        return await t.evaluate(x => x.textContent);
    }))

    const location = await page.$$('div.listing__item .card__title--primary')

    let resultLocation = await Promise.all(location.map(async (t) => {
        return await t.evaluate(x => x.textContent);
    }))

    var resultTotales = []

    for (let index = 0; index < resultPrice.length; index++) {
        resultTotales.push({
          pagina: i, 
          id: resultIds[index], 
          precio: resultPrice[index], 
          currency: resultCurrency[index], 
          location: resultLocation[index]})

    }

    // await page.$eval( '.pagination__page-next a', form => form.click() );


    await delay(2000)

    

    console.log(resultTotales);

    // page.close()

    return resultTotales;

};


async function coso(){
    const browser = await puppeteer.launch({headless: false});

    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 2000});

    // await page.goto('https://www.argenprop.com/departamentos/alquiler/capital-federal/');

    // pagina(browser, 0)

    var totales = []
    for (let index = 409; index < 422; index++) {
        await page.goto('https://www.argenprop.com/departamentos/alquiler/capital-federal' + (index ? '?pagina-' + index : ''));

        if(index === 409) await delay(10000)

        const x = await pagina(page, index)
        totales = [...totales, ...x];
    }


    let fullData = JSON.stringify(totales);
    fs.writeFileSync('fullData.json', fullData);

    browser.close()


    // rightNow = new Date();
    // res = rightNow.toString();
    // console.log(res)

}



coso();
// process();


function process () {
    var barrios = [
        {
          "location": "Flores",
          "barrio": "Flores"
        },
        {
          "location": "Recoleta",
          "barrio": "Recoleta"
        },
        {
          "location": "Liniers",
          "barrio": "Liniers"
        },
        {
          "location": "Colegiales",
          "barrio": "Colegiales"
        },
        {
          "location": "Parque Centenario",
          "barrio": "Caballito"
        },
        {
          "location": "Belgrano",
          "barrio": "Belgrano"
        },
        {
          "location": "Balvanera",
          "barrio": "Balvanera"
        },
        {
          "location": "Barrio Norte",
          "barrio": "Recoleta"
        },
        {
          "location": "Puerto Madero",
          "barrio": "PUERTO MADERO"
        },
        {
          "location": "Almagro Norte",
          "barrio": "Almagro"
        },
        {
          "location": "Palermo Hollywood",
          "barrio": "Palermo"
        },
        {
          "location": "Palermo",
          "barrio": "Palermo"
        },
        {
          "location": "Villa Urquiza",
          "barrio": "Villa Urquiza"
        },
        {
          "location": "Núñez",
          "barrio": "Núñez"
        },
        {
          "location": "Almagro",
          "barrio": "Almagro"
        },
        {
          "location": "San Nicolás",
          "barrio": "San Nicolás"
        },
        {
          "location": "Villa Pueyrredón",
          "barrio": "Villa Pueyrredón"
        },
        {
          "location": "Villa Crespo",
          "barrio": "Villa Crespo"
        },
        {
          "location": "Caballito",
          "barrio": "Caballito"
        },
        {
          "location": "San Telmo",
          "barrio": "San Telmo"
        },
        {
          "location": "Caballito Norte",
          "barrio": "Caballito"
        },
        {
          "location": "Once",
          "barrio": "Balvanera"
        },
        {
          "location": "Belgrano C",
          "barrio": "Belgrano"
        },
        {
          "location": "Floresta",
          "barrio": "Floresta"
        },
        {
          "location": "Centro / Microcentro",
          "barrio": "San Nicolas"
        },
        {
          "location": "Congreso",
          "barrio": "Monserrat"
        },
        {
          "location": "Las Cañitas",
          "barrio": "Palermo"
        },
        {
          "location": "Villa Santa Rita",
          "barrio": "Villa Santa Rita"
        },
        {
          "location": "Villa Devoto",
          "barrio": "Villa Devoto"
        },
        {
          "location": "Palermo Chico",
          "barrio": "Palermo"
        },
        {
          "location": "Saavedra",
          "barrio": "Saavedra"
        },
        {
          "location": "Boedo",
          "barrio": "Boedo"
        },
        {
          "location": "Villa del Parque",
          "barrio": "Villa del Parque"
        },
        {
          "location": "Palermo Soho",
          "barrio": "Palermo"
        },
        {
          "location": "Chacarita",
          "barrio": "Chacarita"
        },
        {
          "location": "Palermo Viejo",
          "barrio": "Palermo"
        },
        {
          "location": "Monserrat",
          "barrio": "Monserrat"
        },
        {
          "location": "San Cristobal",
          "barrio": "San Cristobal"
        },
        {
          "location": "Botánico",
          "barrio": "Palermo"
        },
        {
          "location": "Villa Luro",
          "barrio": "Villa Luro"
        },
        {
          "location": "La Paternal",
          "barrio": "Paternal"
        },
        {
          "location": "Retiro",
          "barrio": "Retiro"
        },
        {
          "location": "Caballito Sur",
          "barrio": "Caballito"
        },
        {
          "location": "Parque Chacabuco",
          "barrio": "Parque Chacabuco"
        },
        {
          "location": "Constitución",
          "barrio": "Constitución"
        },
        {
          "location": "Parque Chas",
          "barrio": "Parque Chas"
        },
        {
          "location": "Barracas",
          "barrio": "Barracas"
        },
        {
          "location": "Flores Sur",
          "barrio": "Flores"
        },
        {
          "location": "Monte Castro",
          "barrio": "Monte Castro"
        },
        {
          "location": "Tribunales",
          "barrio": "San Nicolas"
        },
        {
          "location": "Barrio Chino",
          "barrio": "Belgrano"
        },
        {
          "location": "Versalles",
          "barrio": "VERSALLES"
        },
        {
          "location": "Pompeya",
          "barrio": "NUEVA POMPEYA"
        },
        {
          "location": "Villa Ortuzar",
          "barrio": "Villa Ortuzar"
        },
        {
          "location": "La Boca",
          "barrio": "BOCA"
        },
        {
          "location": "Flores Norte",
          "barrio": "Flores"
        },
        {
          "location": "Belgrano R",
          "barrio": "Belgrano"
        },
        {
          "location": "Parque Patricios",
          "barrio": "PARQUE PATRICIOS"
        },
        {
          "location": "Villa Real",
          "barrio": "VILLA REAL"
        },
        {
          "location": "Belgrano Chico",
          "barrio": "Belgrano"
        },
        {
          "location": "Mataderos",
          "barrio": "Mataderos"
        },
        {
          "location": "Almagro Sur",
          "barrio": "Almagro"
        },
        {
          "location": "Floresta Sur",
          "barrio": "Floresta"
        },
        {
          "location": "Villa General Mitre",
          "barrio": "Villa Gral. Mitre"
        },
        {
          "location": "Barrio Parque",
          "barrio": "Palermo"
        },
        {
          "location": "Abasto",
          "barrio": "Balvanera"
        },
        {
          "location": "Parque Rivadavia",
          "barrio": "Caballito"
        },
        {
          "location": "Palermo Nuevo",
          "barrio": "Palermo"
        },
        {
          "location": "Puerto Retiro",
          "barrio": "Retiro"
        },
        {
          "location": "Coghlan",
          "barrio": "Coghlan"
        },
        {
          "location": "Lomas de Núñez",
          "barrio": "Núñez"
        },
        {
          "location": "Distrito Quartier",
          "barrio": "Retiro"
        },
        {
          "location": "Agronomía",
          "barrio": "AGRONOMIA"
        },
        {
          "location": "Parque Avellaneda",
          "barrio": "PARQUE AVELLANEDA"
        },
        {
          "location": "Cid Campeador",
          "barrio": "Caballito"
        },
        {
          "location": "Velez Sarsfield",
          "barrio": "Velez Sarsfield"
        },
        {
          "location": "Floresta Norte",
          "barrio": "Floresta"
        },
        {
          "location": "Villa Lugano",
          "barrio": "Villa Lugano"
        },
        {
          "location": "Primera Junta",
          "barrio": "Caballito"
        },
        {
          "location": "Barrio Parque General Belgrano",
          "barrio": "Belgrano"
        },
        {
          "location": "Catalinas",
          "barrio": "Retiro"
        },
        {
          "location": "Otro",
          "barrio": ""
        },
        {
          "location": "Villa Soldati",
          "barrio": "Villa Soldati"
        }
    ]

    const x = fs.readFileSync('fullData.json', 'utf8')
    const file = JSON.parse(x)
    
    const withBarrios = file.map(element => {
        const location = element.location.split(',')[0]
        return {
            ID: element.id,
            CURRENCY: element.precio.includes("USD") ? "USD" : "$",
            AMOUNT: element.precio.replace("USD", "").replace("$", ""),
            LOCATION: barrios.filter((b) => b.location === location)[0] ? barrios.filter((b) => b.location === location)[0].barrio : '',

        }
    });


    let fullDataWithBarrios = JSON.stringify(withBarrios);
    fs.writeFileSync('fullDataWithBarrios.json', fullDataWithBarrios);

    let fileString = ''
    fileString += Object.keys(withBarrios[0]).join(',')

    withBarrios.forEach((withBarrio) => {
        fileString += '\n' +  Object.values(withBarrio).join(',')
    })

    fs.writeFileSync('fullDataWithBarrios.csv', fileString, 'utf8')

    // console.log(withBarrios)


}
