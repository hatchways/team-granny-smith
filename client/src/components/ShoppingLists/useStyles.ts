import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    maxWidth: '75rem',
    margin: '2rem 0rem',
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

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(0),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  label: {
    color: 'rgb(0,0,0,1)',
    fontSize: 14,
    fontWeight: 700,
    marginTop: 15,
  },
  dialogContent: {
    paddingRight: '4rem',
    paddingLeft: '4rem',
  },
  inputs: {
    width: '90vw',
    height: '50px',
    borderRadius: '10px',
    backgroundColor: 'white',
    boxShadow: '0px 0px 9px 0px #eaeaea',
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '7rem',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: '10px 10px 0px 0px',
  },
  uploadBox: {
    cursor: 'pointer',
    margin: '1rem',
    width: '10rem',
    borderRadius: '10px',
    backgroundColor: 'white',
    boxShadow: '0px 0px 9px 0px #eaeaea',
  },
  createButton: {
    margin: '2rem',
    width: '12rem',
    height: '3rem',
    borderRadius: 30,
  },
}));

export default useStyles;
