import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9B59B6', // Guardify purple
      light: '#F4F1FA',
      dark: '#8E44AD',
    },
    secondary: {
      main: '#006FA7', // Guardify blue
      light: '#DBEAFE',
      dark: '#002169',
    },
    info: {
      main: '#0891B2', // Guardify teal
      light: '#CFFAFE',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#191C35',
      secondary: '#767676',
    },
    grey: {
      100: '#F3F3F3',
      200: '#EAEAEA',
      300: '#DBEAFE',
      500: '#767676',
      800: '#191C35',
    },
  },
  typography: {
    fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    h1: {
      fontFamily: 'Poppins',
      fontWeight: 600,
    },
    h2: {
      fontFamily: 'Poppins',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'Poppins',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'Poppins',
      fontWeight: 500,
    },
    h5: {
      fontFamily: 'Poppins',
      fontWeight: 500,
    },
    h6: {
      fontFamily: 'Poppins',
      fontWeight: 500,
    },
    body1: {
      fontFamily: 'Poppins',
    },
    body2: {
      fontFamily: 'Poppins',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          border: '1px solid #F3F3F3',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontFamily: 'Poppins',
          fontWeight: 500,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontFamily: 'Poppins',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1E3A8A',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1E3A8A',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1E3A8A',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: 'Poppins',
          '&:hover': {
            backgroundColor: '#DBEAFE',
            color: '#1E3A8A',
          },
          '&.Mui-selected': {
            backgroundColor: '#DBEAFE',
            color: '#1E3A8A',
            '&:hover': {
              backgroundColor: '#DBEAFE',
            },
          },
        },
      },
    },
  },
});

export default theme;