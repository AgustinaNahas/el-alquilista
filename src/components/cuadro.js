import { Box, Chip, FormControlLabel, FormGroup, Hidden, Slider, Switch, TextField, Typography, styled } from '@mui/material';
import { IsMobile } from '../utils/mobile';
import { useEffect, useState } from 'react';

const Container = styled('div')`
  position: fixed;
  width: 100vw;
  padding: 10px;
  z-index: 500;
  background: #3C3C3B;
  top: 0;
  min-height: 40vh;
  ${props => props.theme.breakpoints.up("md")} {
    padding: 50px;
    width: 40vw;
    min-height: 100vh;
  }
`

const Title = styled(Typography)`
  font-weight: 700;
  margin-bottom: 10px;
  font-size: 24px;
  width: 100%;
  text-align: center;
  ${props => props.theme.breakpoints.up("md")} {
    margin-bottom: 80px;
    font-size: 48px;
  }

`


const CTA = styled(Typography)`
  font-weight: 700;
  margin-bottom: 0px;
  font-size: 16px;
  display: none;

  ${props => props.theme.breakpoints.up("md")} {
    margin-bottom: 16px;
    display: block;

  }

`

const StyledTextField = styled(TextField)`
  width: 40%; 

  ${props => props.theme.breakpoints.up("md")} {
    margin-bottom: 10px;
    width: 100%; 
  }

`

const StyledBox = styled(Box)`
  display: flex;
  gap: 20px;

  ${props => props.theme.breakpoints.up("md")} {
    display: block;
  }

`

export default function Cuadro({sueldo, setSueldo, filtered, porcentaje, setPorcentaje, paso, setPaso, aceptaDolares, setAceptaDolares}) {

  const mobile = IsMobile();

  const [barriosDisponibles, setBarriosDisponibles] = useState(0)


  const esSueldazo = (s) => {
    setSueldo(s); 
    if (s > 484000) setPaso(1)
  }

  useEffect(() => {
    if (!filtered || !filtered.features) setBarriosDisponibles(-1)
    else if (!filtered || !filtered.features || filtered.features.length < 0) setBarriosDisponibles(0)
    else setBarriosDisponibles(filtered.features.filter((b) => b.properties.porcentaje > 70).length)
  }, [filtered])

    return (
            <Container>
                <Title variant="h3" color="secondary">El Alquilista</Title>
                
                <StyledBox
                  component="form"
                  noValidate
                  autoComplete="off"
                  sx={{ mb: { xs: 2, md: 20 } }}
                >
                  <CTA variant="h5" >Ingresá tu sueldo</CTA>
                  <StyledTextField id="outlined-basic" label={mobile ? "Ingresá tu sueldo" : "Sueldo"} variant="outlined" color="secondary" focused 
                  value={sueldo} size={"small"} onChange={(a) => esSueldazo(a.target.value) } />
                  <Hidden smDown>
                    <Slider min={100000} max={1000000} step={10000} defaultValue={210000} aria-label="Default" 
                      valueLabelDisplay="none" color="secondary" value={sueldo} onChange={(a) => esSueldazo(a.target.value) } />
                  </Hidden>
                </StyledBox>

                <Slider min={100000} max={1000000} step={10000} defaultValue={210000} aria-label="Default" 
                      valueLabelDisplay="none" color="secondary" value={sueldo} onChange={(a) => esSueldazo(a.target.value) } />

                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                  sx={{ mb: { xs: 2, md: 20 } }}
                  style={{ display: paso === 1 ? "block" : "none" }}
                >
                  <CTA variant="h5" style={{ display: "block !important", fontSize: 14, fontWeight: 300, fontFamily: '"Roboto","Helvetica","Arial",sans-serif' }} >Ingresá el porcentaje de tu sueldo destinado al alquiler</CTA>
                  <Slider min={0} max={100} step={10} defaultValue={100} aria-label="Default" 
                    valueLabelDisplay="auto" color="secondary" value={porcentaje} onChange={(a) => setPorcentaje(a.target.value) } />
                </Box>
                <FormGroup>
                  <FormControlLabel control={<Switch checked={aceptaDolares} onChange={(a) => {setAceptaDolares((a) => !a)}} />} label="Pago en dólares" />
                </FormGroup>

                {barriosDisponibles <= 0 && <Typography component="h2">Con ese presupuesto no hay deptos en alquiler en CABA</Typography>}
                {barriosDisponibles > 0 && barriosDisponibles < 8 && <Typography component="h2">No pareciera que haya muchos barrios para alquilar con ese presupuesto</Typography>}
                {barriosDisponibles >= 8 && barriosDisponibles < 35 && <Typography component="h2">Ese presupuesto nos da algunas opciones para alquilar</Typography>}
                {barriosDisponibles >= 35 && <Typography component="h2">Bien, ese presupuesto nos permite alquilar en mayor parte de la ciudad</Typography>}

      </Container>
    );
  }