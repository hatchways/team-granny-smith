import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    color: '#d7d7d7',
    cursor: 'pointer',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(0),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  required: {
    color: theme.palette.primary.main,
  },
  label: {
    color: 'rgb(0,0,0,1)',
    fontSize: 14,
    fontWeight: 700,
    marginTop: 15,
  },
  dialogContent: {
    paddingRight: '3rem',
    paddingLeft: '3rem',
    maxHeight: '20rem',
  },
  inputs: {
    width: '90vw',
    height: '50px',
    borderRadius: '10px',
    backgroundColor: 'white',
    boxShadow: '0px 0px 9px 0px #eaeaea',
    textAlign: 'center',
  },
  image: {
    maxHeight: '10rem',
    margin: '1.5rem',
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
  buttonSpinner: {
    color: 'white',
    width: '20px !important',
    height: '20px !important',
    marginLeft: '.5rem',
  },
  backButton: {
    position: 'absolute',
    left: '6%',
    top: '50%',
    marginTop: '-27px',
  },
  dialogPaper: {
    maxWidth: '600px',
    width: '90vw',
    maxHeight: '500px',
    height: '90vh',
    overflow: 'hidden',
  },
  closeContainer: {
    zIndex: 1,
  },
  productsContainer: {
    position: 'absolute',
    paddingTop: '56px',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  addButton: {
    padding: '1rem 2.5rem',
    borderRadius: '50px',
    margin: '1.5rem 0',
  },
  buttonContainer: { position: 'relative' },
  select: {
    '& div': {
      padding: '0 !important',
    },
    '& svg': {
      marginRight: '1rem',
    },
    width: '100%',
    height: '50px',
    borderRadius: '10px',
    backgroundColor: 'white',
    boxShadow: '0px 0px 9px 0px #eaeaea',
    textAlign: 'center',
    marginTop: '1rem',
    padding: '2rem 0',
  },

  titleContainer: {},
}));

export default useStyles;
