import { useEffect, useRef, useState } from 'react';
import { Box, Slider, TextField, Typography } from '@mui/material';


export default function Cuadro({sueldo, setSueldo, filtered}) {
  const formatterUS = new Intl.NumberFormat('en-US');

    return (
            <div style={{ position: 'fixed', width: '30vw', padding: 50, zIndex: 500, background: '#3C3C3B', top: 0, height: "100vh" }}>
                <Typography variant="h3" style={{ color: '#FFD500', fontWeight: 700, marginBottom: 80 }}>BusCABA alquiler</Typography>
                <Typography variant="h5" style={{ fontWeight: 700, marginBottom: 40 }}>Ingresá tu sueldo</Typography>
                {/* <Typography variant="p">{formatterUS.format(sueldo)}</Typography> */}
                
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                  style={{ marginBottom: 80 }}
                >
                  <TextField id="outlined-basic" label="Sueldo" variant="outlined" color="secondary" focused 
                  value={sueldo} size={"small"} style={{ width: "100%", marginBottom: 10 }}  onChange={(a) => setSueldo(a.target.value) } />
                  <Slider min={100000} max={1000000} step={10000} defaultValue={210000} aria-label="Default" 
                    valueLabelDisplay="none" color="secondary" value={sueldo} onChange={(a) => setSueldo(a.target.value) } />
                </Box>


                {(!filtered || !filtered.features) &&  <Typography component="h2">Ingresá tu sueldo</Typography>}
                {filtered && filtered.features && filtered.features.length <= 0 && <Typography component="h2">Con ese presupuesto no hay deptos en alquiler en CABA</Typography>}
                {filtered && filtered.features && filtered.features.length > 0 && filtered.features.length < 10 && <Typography component="h2">No pareciera que haya muchos barrios para alquilar con ese presupuesto</Typography>}
                {filtered && filtered.features && filtered.features.length >= 10 && filtered.features.length < 30 && <Typography component="h2">Ese presupuesto nos da algunas opciones para alquilar</Typography>}
                {filtered && filtered.features && filtered.features.length >= 30 && <Typography component="h2">Bue, el millonario</Typography>}

                {/* <Typography component="h2">{sueldo}</Typography> */}

            
      </div>
    );
  }