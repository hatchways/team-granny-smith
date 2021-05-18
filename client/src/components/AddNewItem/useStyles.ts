import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: 50,
    marginTop: '1.5rem',
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
  },
}));

export default useStyles;
