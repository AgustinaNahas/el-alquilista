import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        mode: 'dark',
        secondary: { main: '#FFD500'}
    },
    typography: {
        h3: {
            fontFamily: "'Roboto Slab', serif;"
        },
        h5: {
            fontFamily: "'Roboto Slab', serif;"
        }
    },
    '.MuiTextField-root': {
        color: "white"
    },
    '.MuiChip-root': {
        fontWeight: 700
    }
  });