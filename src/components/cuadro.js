import { Box, Chip, Slider, TextField, Typography, styled } from '@mui/material';

const Container = styled('div')`
  position: fixed;
  width: 100vw;
  padding: 10px;
  z-index: 500;
  background: #3C3C3B;
  top: 0;
  height: 30vh;
  ${props => props.theme.breakpoints.up("md")} {
    padding: 50px;
    width: 30vw;
    height: 100vh;
  }
`

const Title = styled(Typography)`
  font-weight: 700;
  margin-bottom: 16px;
  font-size: 36px;
  width: 100%;
  text-align: center;
  ${props => props.theme.breakpoints.up("md")} {
    margin-bottom: 80px;
    font-size: 48px;
  }

`


const CTA = styled(Typography)`
  font-weight: 700;
  margin-bottom: 16px;
  ${props => props.theme.breakpoints.up("md")} {

  }

`

export default function Cuadro({sueldo, setSueldo, filtered}) {
    console.log(filtered)

    return (
            <Container>
                <Title variant="h3" color="secondary">BusCABA alquiler</Title>
                <CTA variant="h5" >Ingresá tu sueldo</CTA>
                
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
                    <Box style={{ display: "flex", justifyContent: "space-between" }}>
                      <Chip label="Sueldo mínimo" variant="outlined" color="secondary" onClick={() => setSueldo(156000)} />
                      <Chip label="Sueldo promedio" variant="outlined" color="secondary" onClick={() => setSueldo(484000)} />
                    </Box>
                </Box>

                {(!filtered || !filtered.features) &&  <Typography component="h2">Ingresá tu sueldo</Typography>}
                {filtered && filtered.features && filtered.features.length <= 0 && <Typography component="h2">Con ese presupuesto no hay deptos en alquiler en CABA</Typography>}
                {filtered && filtered.features && filtered.features.length > 0 && filtered.features.length < 10 && <Typography component="h2">No pareciera que haya muchos barrios para alquilar con ese presupuesto</Typography>}
                {filtered && filtered.features && filtered.features.length >= 10 && filtered.features.length < 35 && <Typography component="h2">Ese presupuesto nos da algunas opciones para alquilar</Typography>}
                {filtered && filtered.features && filtered.features.length >= 35 && <Typography component="h2">Bue, el millonario</Typography>}

      </Container>
    );
  }