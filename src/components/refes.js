import { Alert, Box, Button, Chip, FormControlLabel, FormGroup, Hidden, Slider, Step, StepContent, StepLabel, Stepper, Switch, TextField, Typography, styled } from '@mui/material';
import { IsMobile } from '../utils/mobile';
import { useEffect, useState } from 'react';


const Green = styled('div')`
  border-radius: 0 4px 4px 0;
  background: #A7D5C2A0;
  height: 20px;
  width: 40px;
  text-align: center;
  font-size: 10px;
  font-weight: 600;

  display: flex;
  align-items: center;
  justify-content: center;
`

const Yellow = styled('div')`
  border-radius: 0;
  background: #FFD500A0;
  height: 20px;
  width: 40px;
  text-align: center;
  font-size: 10px;
  font-weight: 600;

  display: flex;
  align-items: center;
  justify-content: center;
`

const Red = styled('div')`
  border-radius: 4px 0 0 4px;
  background: #EC607EA0;
  height: 20px;
  width: 40px;
  text-align: center;
  font-size: 10px;
  font-weight: 600;

  display: flex;
  align-items: center;
  justify-content: center;

`

// stops: [[0, '#EC607E'], [50, '#FFD500'], [100, '#A7D5C2']]

export default function Refes({}) {


    return (

      <Box style={{ position: "absolute", bottom: 10, right: 10, display: "flex"  }}> 
        <Red>0%</Red>
        <Yellow>50%</Yellow>
        <Green>100%</Green>

      </Box>
    );
  }