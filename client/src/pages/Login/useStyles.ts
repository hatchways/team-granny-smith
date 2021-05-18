import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '10vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  authWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingTop: 23,
    backgroundColor: '#f2f2f2',
  },
  welcome: {
    fontSize: 22,
    color: '#000000',
    fontWeight: 700,
    fontFamily: "'Open Sans'",
    marginBottom: '20px',
    textAlign: 'center',
  },
}));

export default useStyles;
