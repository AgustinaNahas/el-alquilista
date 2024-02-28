import { useCallback, useEffect, useRef, useState } from 'react';
import data from './data.js';
import caba from './caba.js';

import CloseIcon from '@mui/icons-material/Close';

import Map, {
    Source,
    Layer
  } from "react-map-gl";
import { Dialog, DialogContent, DialogTitle, Fab, IconButton, Typography, styled, Link as MuiLink, DialogActions, Button } from '@mui/material';
import Cuadro from './cuadro.js';
import { IsMobile } from '../utils/mobile.js';
import getAlquileres from './alquileres.js';
import getDolarHoy from './dolarHoy.js';
import Refes from './refes.js';
import { Info } from '@mui/icons-material';

import Link from 'next/link.js';


const Tooltip = styled('div')`
    position: absolute;
    background: #3C3C3B;
    max-width: 150px;
    padding: 8px;
    border-radius: 2px;
    transform: translate(-50%, -100%);
  ${props => props.theme.breakpoints.up("md")} {
    // padding: 50px;
    // width: 40vw;
    // min-height: 100vh;
  }
`

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

export default function CabaMap() {
    
    const [fullData, setFullData] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [alquileres, setAlquileres] = useState([]);
    const [sueldo, setSueldo] = useState(210000);
    const [porcentaje, setPorcentaje] = useState(100);
    const [paso, setPaso] = useState(0);
    const [dolarHoy, setDolarHoy] = useState(1000);
    const [aceptaDolares, setAceptaDolares] = useState(true);

    const [precioDolares, setPrecioDolares] = useState(0);
    const [precio, setPrecio] = useState(0);

    const barrios = ["Chacarita",
    "Paternal",
    "Villa Crespo",
    "Villa del Parque",
    "Almagro",
    "Caballito",
    "Villa Santa Rita",
    "Monte Castro",
    "VILLA REAL",
    "Flores",
    "Floresta",
    "Constitucion",
    "San Cristobal",
    "Boedo",
    "Velez Sarsfield",
    "Villa Luro",
    "PARQUE PATRICIOS",
    "Mataderos",
    "VILLA LUGANO",
    "San Telmo",
    "Saavedra",
    "Coghlan",
    "Villa Urquiza",
    "Colegiales",
    "Balvanera",
    "Villa Gral. Mitre",
    "Parque Chas",
    "AGRONOMIA",
    "Villa Ortuzar",
    "Barracas",
    "PARQUE AVELLANEDA",
    "Parque Chacabuco",
    "NUEVA POMPEYA",
    "Palermo",
    "VILLA RIACHUELO",
    "VILLA SOLDATI",
    "Villa Pueyrredon",
    "Villa Devoto",
    "Liniers",
    "VERSALLES",
    "PUERTO MADERO",
    "Monserrat",
    "San Nicolas",
    "Belgrano",
    "Recoleta",
    "Retiro",
    "Nuñez",
    "BOCA"]

    const mobile = IsMobile();

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(true);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };

  const [hoverInfo, setHoverInfo] = useState(null);


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

    const loadAlquileres = async () => {
        const alq = await getAlquileres();
        setAlquileres(alq)
    }

    const loadDolarHoy = async () => {
        const dhoy = await getDolarHoy();
        setDolarHoy(dhoy)
    }

    useEffect(() => {
        if (alquileres.length === 0) loadAlquileres();
        loadDolarHoy();
    }, []);


    useEffect(() => {
        if (aceptaDolares) setPrecioDolares(sueldo * (porcentaje/100) / dolarHoy)
        setPrecio(sueldo * (porcentaje/100))

        console.log(sueldo * (porcentaje/100) / dolarHoy, sueldo * (porcentaje/100))
    }, [sueldo, porcentaje, aceptaDolares]);

    const onHover = useCallback(event => {
        const {
          features,
          point: {x, y}
        } = event;

        const hoveredFeature = features && features[0];
    
        setHoverInfo(hoveredFeature && {feature: hoveredFeature, x, y});
      }, []);

    useEffect(() => {
        if (fullData && fullData.features && alquileres.length > 0) {

            let fullCopy = JSON.parse(JSON.stringify(fullData.features))

            fullCopy.map((barrio) => {
                const totales = alquileres.filter((a) => {
                    const b_ind = barrios[parseInt(a.BARRIO)]
                    return barrio.properties['BARRIO'] === b_ind
                }).length

                const disponibles = alquileres.filter((a) => {
                    const b_ind = barrios[parseInt(a.BARRIO)]

                    if (aceptaDolares) return barrio.properties['BARRIO'] === b_ind && ((a.AMOUNT < precio && a.CURRENCY !== "USD") || (a.AMOUNT < precioDolares && a.CURRENCY === "USD"))
                    return barrio.properties['BARRIO'] === b_ind && a.AMOUNT < precio && a.CURRENCY !== "USD"
                }).length

                const pdisp = disponibles / totales

                barrio.properties.totales = totales;
                barrio.properties.disponibles = disponibles;
                barrio.properties.porcentaje = pdisp * 100;

                return barrio;
            })

            var dataFiltered = JSON.parse(JSON.stringify(fullData));
            dataFiltered.features = fullCopy;
    
            setFiltered(dataFiltered)

            // console.log(dataFiltered)
    
        }

    }, [fullData, alquileres, precio, precioDolares, aceptaDolares ])

    const capitalize = (string) => {
        return string.split(' ').map((s) => s.charAt(0).toUpperCase() + s.toLowerCase().slice(1)).join(" ");
    }

    const layerStyle = {
        'id': 'barrios-layer',
        'type': 'fill',
        'source-id': 'barrios',
        'paint': {              
            'fill-color': {
                property: 'porcentaje',
                stops: [[0, '#EC607E'], [50, '#FFD500'], [100, '#A7D5C2']]
            },
            'fill-opacity': 0.8
        }
      };

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            {filtered && (mobile ? <Map
                mapStyle="mapbox://styles/mapbox/dark-v11"
                mapboxAccessToken={process.env.NEXT_PUBLIC_TOKEN}
                boxZoom={false}
                // scrollZoom={false}
                style={{
                    height: '100vh',
                    width: '100vw'
                }}
                onMouseDown={(a) => {onHover(a);}}
                onMove={() => setHoverInfo(null)}
                onLoad={(a) => {
                    a.target.setZoom(10.20)
                    for (let index = 0; index < 100000; index++) {
                        console.log()                        
                    }
                    a.target.flyTo({ center: [-58.45689200256368, -34.55322214007016] })
                }}
                interactiveLayerIds={['barrios-layer']}
                initialViewState={{
                    longitude: -58.44493682767809, 
                    latitude: -34.46406573521092, 
                    zoom: 10.23}}
                >
                    <Source id="barrios" type="geojson" data={filtered}>
                        <Layer {...layerStyle}>
                        </Layer>
                    </Source>       
                    {/* {showPopup && (
                    <Popup longitude={-58.44493682767809} latitude={-34.46406573521092}
                        anchor="bottom"
                        onClose={() => setShowPopup(false)}>
                        You are here
                    </Popup>)}           */}
         
            </Map> : <Map
                mapStyle="mapbox://styles/mapbox/dark-v11"
                mapboxAccessToken={process.env.NEXT_PUBLIC_TOKEN}
                boxZoom={false}
                // scrollZoom={false}
                style={{
                    height: '100vh',
                    width: '100vw'
                }}
                interactiveLayerIds={['barrios-layer']}
                onMouseMove={(a) => {onHover(a);}}
                initialViewState={{
                    longitude: -58.50330169991081, 
                    latitude: -34.61621393391216, 
                    zoom: 11.35}}
                >
                    <Source id="barrios" type="geojson" data={filtered}>
                        <Layer {...layerStyle}>
                        </Layer>
                    </Source>       
            </Map>)}
            {hoverInfo && (
                <Tooltip style={{left: hoverInfo.x, top: hoverInfo.y - 5}}>
                    <b>{capitalize(hoverInfo.feature.properties.BARRIO)}</b>
                    <div>Disponibilidad para vos: {hoverInfo.feature.properties.disponibles}/{hoverInfo.feature.properties.totales}</div>
                </Tooltip>
            )}     
            <Refes/>
            <Cuadro 
                filtered={filtered} 
                sueldo={sueldo} setSueldo={setSueldo} 
                porcentaje={porcentaje} setPorcentaje={setPorcentaje} 
                paso={paso} setPaso={setPaso}
                aceptaDolares={aceptaDolares} setAceptaDolares={setAceptaDolares}
                />
            <Fab color="secondary" aria-label="info" onClick={handleOpen} style={{ position: "absolute", bottom: 20, left: 20 }}>
                <Info />
            </Fab>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Fuentes
                </DialogTitle>
                <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
                >
                <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                <Typography gutterBottom>
                    <MuiLink color="secondary"><Link target="_blank" href="https://www.boletinoficial.gob.ar/detalleAviso/primera/302875/20240221">Salario mínimo vital y movil</Link></MuiLink> (Última actualización: 15 feb 2024)
                </Typography>
                <Typography gutterBottom>
                    <MuiLink color="secondary"><Link target="_blank" href="https://docs.google.com/spreadsheets/d/1DguVTyzAWadeUkkzokNIAQSDuQklfzFX7CwEfkkCnpc/edit?usp=sharing">Lista de alquileres completos de ZonaProp</Link></MuiLink> (Última actualización: 19 feb 2024)
                </Typography>
                <Typography gutterBottom>
                    <MuiLink color="secondary"><Link target="_blank" href="https://dolarapi.com">Dolar Hoy</Link></MuiLink> (Última actualización: hoy)
                </Typography>
                </DialogContent>
            </BootstrapDialog>
            <BootstrapDialog
                onClose={handleClose2}
                aria-labelledby="customized-dialog-title"
                open={open2}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    El Alquilista
                </DialogTitle>
                <IconButton
                aria-label="close"
                onClick={handleClose2}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Te damos la bienvenida a El Alquilista. 
                    </Typography>
                    <Typography gutterBottom>
                        En esta página queremos ayudarte a buscar un departamento para alquilar, acorde con tu sueldo.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose2} autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
        
    );
  }