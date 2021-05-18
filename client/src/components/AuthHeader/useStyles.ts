import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  authHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
  accAside: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 700,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 0',
  },
  link: { textDecoration: 'none' },
  accBtn: {
    width: 120,
    height: '2em',
    filter: 'drop-shadow(0px 2px 6px rgba(74,106,149,0.2))',
    backgroundColor: '#f2f2f2',
    color: '#ff0000',
    boxShadow: 'none',
  },
}));

export default useStyles;
