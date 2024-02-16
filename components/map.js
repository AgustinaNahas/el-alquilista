import { useEffect, useRef, useState } from 'react';
import data from './data.js';
import caba from './caba.js';

import Map, {
    Source,
    Layer,
  } from "react-map-gl";
import { Slider, Typography } from '@mui/material';


export default function CabaMap() {
    
    const [fullData, setFullData] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [sueldo, setSueldo] = useState(210000);

    useEffect(() => {
        caba.features.map((f) => {
            var final = f;
            const barrio = f.properties.BARRIO
            var properties = f.properties;
            var mas = data.filter((d) => d.BARRIO.toLowerCase() === barrio.toLowerCase())[0]
            final.properties = {...properties, ...mas}

            return final;
        })

        setFullData(caba)
        // setFiltered(caba)
        console.log(caba)

    }, []);

    useEffect(() => {
        console.log(fullData)
        console.log(fullData.features)
        if (fullData && fullData.features) {

            let fullCopy = JSON.parse(JSON.stringify(fullData.features))

            var f = fullCopy.filter((barrio) => {
                return barrio.properties['INDEX'] < sueldo
            })

            var dataFiltered = JSON.parse(JSON.stringify(fullData));
            dataFiltered.features = f;
    
            setFiltered(dataFiltered)
    
        }

    }, [fullData, sueldo])

    const layerStyle = {
        'type': 'fill',
        'source-id': 'barrios',
        'paint': {              
            'fill-color': {
                property: 'INDEX',
                stops: [[200000, '#ffff00'], [600000, '#ff0000']]
            },
            'fill-opacity': 0.5
        }
      };

    return (
        <div style={{ padding: 50 }}>
                <Typography component="h2">Ingresá tu sueldo</Typography>
                <Typography component="h2">{sueldo}</Typography>

                {(!filtered || !filtered.features) &&  <Typography component="h2">Ingresá tu sueldo</Typography>}
                {filtered && filtered.features && filtered.features.length <= 0 && <Typography component="h2">Con ese presupuesto no hay deptos en alquiler en CABA</Typography>}
                {filtered && filtered.features && filtered.features.length > 0 && filtered.features.length < 10 && <Typography component="h2">No pareciera que haya muchos barrios para alquilar con ese presupuesto</Typography>}
                {filtered && filtered.features && filtered.features.length >= 10 && filtered.features.length < 30 && <Typography component="h2">Ese presupuesto nos da algunas opciones para alquilar</Typography>}
                {filtered && filtered.features && filtered.features.length >= 30 && <Typography component="h2">Bue, el millonario</Typography>}
                
                <Slider min={100000} max={1000000} step={10000} defaultValue={210000} aria-label="Default" 
                valueLabelDisplay="none" onChange={(a) => setSueldo(a.target.value) } />
            {filtered && <Map
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={process.env.NEXT_PUBLIC_TOKEN}
                boxZoom={false}
                scrollZoom={false}
                style={{
                    height: '75vh',
                    width: '80vw'
                }}
                initialViewState={{longitude: -58.44504529638047, latitude: -34.61334039657031, zoom: 11}}
                >
                    <Source id="barrios" type="geojson" data={filtered}>
                        <Layer {...layerStyle}>
                        </Layer>
                    </Source>                
            </Map>}
      </div>
    );
  }