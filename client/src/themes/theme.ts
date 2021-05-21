import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Open Sans", "sans-serif", "Roboto"',
    fontSize: 12,
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 20,
      },
    },
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: 'white',
        },
      },
    },
  },
  palette: {
    primary: { main: '#DF1B1B' },
  },
  shape: {
    borderRadius: 5,
  },
});
