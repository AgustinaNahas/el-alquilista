import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        mode: 'dark',
        secondary: { main: '#FFD500'}
    },
    typography: {
      fontFamily: "'Roboto Slab', serif;"
    },
    '.MuiTextField-root': {
        color: "white"
    }
  });