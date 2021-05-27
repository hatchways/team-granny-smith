import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'auto',
    maxWidth: '75rem',
    margin: '2rem',
  },
  addNewListContainer: {
    cursor: 'pointer',
    margin: '1.5rem 1rem 1rem 0',
    width: '15rem',
    borderRadius: '10px',
    backgroundColor: 'white',
    boxShadow: '0px 0px 9px 0px #eaeaea',
  },
  addIcon: {
    fontSize: '3rem',
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
