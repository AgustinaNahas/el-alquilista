import { Alert, Box, Button, Chip, FormControlLabel, FormGroup, Hidden, Slider, Step, StepContent, StepLabel, Stepper, Switch, TextField, Typography, styled } from '@mui/material';
import { IsMobile } from '../utils/mobile';
import { useEffect, useState } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import styles from './styles.module.css'

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
  display: block;
  width: 100%;

  ${props => props.theme.breakpoints.up("md")} {
    margin-bottom: 16px;
    display: block;
  }
`

const StyledTextField = styled(TextField)`
  width: 35%; 
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

const steps = [
  {
    label: 'Ingresá tu sueldo',
    content: ({sueldo, esSueldazo}) => {
      return <>
        {/* <CTA variant="h5" >Ingresá tu sueldo</CTA> */}
        <StyledBox
          component="form"
          noValidate
          autoComplete="off"
          sx={{ mb: { xs: 2, md: 20 } }}
        >
          <Slider min={100000} max={1500000} step={10000} defaultValue={210000} aria-label="Default" 
            valueLabelDisplay="none" color="secondary" value={sueldo} onChange={(a) => esSueldazo(a.target.value) } />
          
        </StyledBox>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Chip label="Sueldo mínimo" variant="outlined" color="secondary" onClick={() => esSueldazo(156000)} />
            <Chip label="Sueldo promedio" variant="outlined" color="secondary" onClick={() => esSueldazo(484000)} />
          </Box>
      </>
    }
  },
  {
    label: 'Ingresá el porcentaje de tu sueldo destinado al alquiler',
    content: ({porcentaje, setPorcentaje, setPorcentajeChanged}) => {
      return <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ mb: { xs: 2, md: 20 } }}
    >
      <Slider min={0} max={100} step={10} defaultValue={100} aria-label="Default" 
        valueLabelDisplay="auto" color="secondary" value={porcentaje} onChange={(a) => {setPorcentaje(a.target.value); setPorcentajeChanged(true);} } />
    </Box>


    },
  },
  {
    label: 'Acepta dólares',
    content: ({aceptaDolares, setAceptaDolares}) => {
      return <FormGroup color="secondary">
        <FormControlLabel color="secondary" control={<Switch color="secondary" checked={aceptaDolares} onChange={(a) => {setAceptaDolares((a) => !a)}} />} label="Pago en dólares" />
      </FormGroup>
    }
  },
];

export default function Cuadro({sueldo, setSueldo, filtered, porcentaje, setPorcentaje, aceptaDolares, setAceptaDolares}) {

  const mobile = IsMobile();

  const [barriosDisponibles, setBarriosDisponibles] = useState(0)

  const [activeStep, setActiveStep] = useState(0);
  const [alert, setAlert] = useState(null);
  const [sueldoChanged, setSueldoChanged] = useState(false);
  const [porcentajeChanged, setPorcentajeChanged] = useState(false);


  const [maxStep, setMaxStep] = useState(0);


  const esSueldazo = (s) => {
    setSueldoChanged(true)
    setSueldo(s); 
  }

  useEffect(() => {
    if (!filtered || !filtered.features) setBarriosDisponibles(-1)
    else if (!filtered || !filtered.features || filtered.features.length < 0) setBarriosDisponibles(0)
    else setBarriosDisponibles(filtered.features.filter((b) => b.properties.porcentaje > 70).length)
  }, [filtered])


  useEffect(() => {
    if (activeStep > maxStep) setMaxStep(activeStep)

    if (activeStep === 0 && maxStep === 0) {
      if (!sueldoChanged) setAlert({severity: "info", text: "Ingresá tu sueldo para mostrarte en qué barrios de Capital Federal podés alquilar."})
    } 
    if (sueldoChanged) {
      if (barriosDisponibles <= 0) setAlert({severity: "error", text: "Con ese presupuesto no hay deptos en alquiler en CABA."})
      else if (barriosDisponibles > 0 && barriosDisponibles < 8) setAlert({severity: "warning", text: "No pareciera que haya muchos barrios para alquilar con ese presupuesto."})
      else if (barriosDisponibles >= 8 && barriosDisponibles < 35) setAlert({severity: "warning", text: "Ese presupuesto nos da algunas opciones para alquilar."})
      else if (barriosDisponibles >= 35) {
        if (activeStep === 0 && maxStep <= 0 || !porcentajeChanged) setAlert({severity: "success", text: "Ese presupuesto nos permite alquilar en mayor parte de la ciudad. Pero qué porcentaje de tu sueldo estás dispuesto a destinar al alquiler?"})
        else if (activeStep === 1 && maxStep <= 1) setAlert({severity: "success", text: "Ese presupuesto nos permite alquilar en mayor parte de la ciudad. Pero estás dispuesto a pagar en dólares, cierto?"})
        else setAlert({severity: "success", text: "Ese presupuesto nos permite alquilar en mayor parte de la ciudad."})
      }      

      
    }


  }, [activeStep, sueldoChanged, porcentajeChanged, sueldo, porcentaje, aceptaDolares, barriosDisponibles])

    return (
            <Container color="secondary" className={styles.container}>
                <Title variant="h3" color="secondary" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <div style={{ position: "relative", marginRight: 10  }}>
                  <HomeIcon  style={{ fontSize: 32}}/><AttachMoneyIcon style={{ fontSize: 10, position: "absolute", left: 11, top: 8, color: "#3C3C3B" }} />
                  </div>
                  El Alquilista
                  </Title>
                <Box sx={{ maxWidth: 400 }} color="secondary">
                  {alert && <Alert severity={alert.severity}>{alert.text}</Alert>}
                  <Stepper activeStep={activeStep} nonLinear={true} orientation="vertical" color="secondary">
                    {steps.map((step, index) => {
                      const Content = step.content;
                      return <Step key={step.label} color="secondary"
                        onClick={() => setActiveStep(index)}
                        sx={{
                          '& .MuiStepLabel-root .Mui-completed': {
                            color: 'secondary.dark', // circle color (COMPLETED)
                          },
                          '& .MuiStepLabel-root .Mui-active': {
                            color: 'secondary.main', // circle color (ACTIVE)
                          },                          
                          '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                            fill: 'black', // circle's number (ACTIVE)
                          }
                        }}>
                      <StepLabel color="secondary"
                        optional={
                          maxStep >= index ? (index === 0 ? sueldo : 
                          (index === 1 ? porcentaje + "%" : (aceptaDolares?"Sí": "No")) ) : ''
                        }
                      >
                        {step.label}
                      </StepLabel>
                      <StepContent color="secondary">
                        <Content sueldo={sueldo} esSueldazo={esSueldazo} 
                          porcentaje={porcentaje} setPorcentaje={setPorcentaje} setPorcentajeChanged={setPorcentajeChanged}
                          aceptaDolares={aceptaDolares} setAceptaDolares={setAceptaDolares}
                          />
                      </StepContent>
                    </Step>
                    })}
                  </Stepper>
                </Box>

      </Container>
    );
  }