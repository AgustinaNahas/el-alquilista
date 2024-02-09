import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from 'react';
// import './map.css' 
import data from './data.js';
import caba from './caba.js';

export default function Map() {

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_TOKEN;

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-58.44504529638047);
    const [lat, setLat] = useState(-34.61334039657031);
    const [zoom, setZoom] = useState(11);

    useEffect(() => {
        if (map.current) return; // initialize map only once

        console.log(data)
        console.log(caba)

        caba.features.map((f) => {
            var final = f;
            const barrio = f.properties.BARRIO
            var properties = f.properties;
            var mas = data.filter((d) => d.BARRIO.toLowerCase() === barrio.toLowerCase())[0]
            final.properties = {...properties, ...mas}

            return final;
        })

        console.log(caba)

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        map.current.on('load', () => {
            // Add a data source containing GeoJSON data.
            map.current.addSource('maine', {
                'type': 'geojson',
                'data': caba
            });
             
            // Add a new layer to visualize the polygon.
            map.current.addLayer({
                'id': 'maine',
                'type': 'fill',
                'source': 'maine', // reference the data source
                'layout': {},
                'paint': {
                    'fill-color': {
                        property: 'INDEX',
                        stops: [[200000, '#ffff00'], [600000, '#ff0000']]
                    },
                    'fill-opacity': 0.5
                }
            });
        });

    }, []);

    return (
      <div>
            <div ref={mapContainer} className="map-container" style={{ height: "75vh", width: "75vh" }} />
      </div>
    );
  }
  