import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    padding: '.5rem',
    borderRadius: '2px',
    backgroundColor: 'white',
    boxShadow: '0px 0px 9px 0px #eaeaea',
    marginBottom: '1rem',
  },
  imageContainer: {
    width: '6rem',
    height: '6rem',
    marginRight: '1.5rem',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  titleContainer: {
    margin: '1rem 0 0 0',
  },
  urlContainer: {
    whiteSpace: 'nowrap',
    width: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  lineThroughText: {
    textDecoration: 'line-through',
  },
  removeButton: {
    width: '5rem',
  },
  buttonSpinner: {
    color: 'gray',
    width: '20px !important',
    height: '20px !important',
  },
}));

export default useStyles;
