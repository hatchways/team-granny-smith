import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
    margin: '1.5rem 1rem 1rem 0',
    width: '15rem',
    borderRadius: '10px',
    backgroundColor: 'white',
    boxShadow: '0px 0px 9px 0px #eaeaea',
  },
  imageContainer: {
    width: '100%',
    height: '15rem',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: '10px 10px 0px 0px',
  },
}));

export default useStyles;
