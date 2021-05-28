import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '2rem',
  },
  form: {
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: 50,
    marginTop: '1.5rem',
    boxShadow: '0px 0px 9px 0px #eaeaea',
    width: '90%',
    maxWidth: '700px',
  },
  input: {
    display: 'flex',
    padding: '.8rem 1.5rem',
    flexGrow: 1,
  },
  select: {
    padding: '.8rem .5rem .8rem 1.5rem',
    border: 'none',
    marginRight: '1rem',
    borderLeft: '2px solid  #f3f3f3',
  },
  selectInitialState: {
    color: '#a2a2a2',
  },
  addBtn: {
    margin: '.5rem',
    width: '7rem',
  },
  productName: {
    fontSize: '20px',
  },
  productPrice: {
    fontSize: '20px',
  },
  dialogActions: {
    paddingBottom: '20px',
    paddingRight: '20px',
  },
  loadingProgress: {
    color: 'white',
  },
}));

export default useStyles;
