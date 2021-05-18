import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  dashboard: { backgroundColor: '#FFFFFF' },
  drawerWrapper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: '300px',
    },
  },
  logo: {
    height: '2rem',
    paddingLeft: '1.5rem',
  },
  navBar: {
    boxShadow: '0px 0px 6px 0px #d5d5d5',
    height: '4rem',
  },
  navBarItem: {
    margin: '.5rem',
  },
  profileWrapper: {
    marginLeft: '2.5rem',
    marginRight: '1.5rem',
    width: 'auto',
  },
  profilePicture: {
    borderRadius: '50%',
    height: '2.5rem',
  },
}));

export default useStyles;
