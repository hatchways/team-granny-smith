import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  label: {
    color: 'rgb(0,0,0,1)',
    fontSize: 14,
    fontWeight: 700,
    marginTop: 15,
    marginBottom: -7,
  },
  inputs: {
    height: '50px',
    padding: '0px',
    backgroundColor: 'white',
    filter: 'drop-shadow(0px 2px 6px rgba(74,106,149,0.2))',
    textAlign: 'center',
  },
  forgot: {
    paddingRight: 10,
    color: '#3a8dff',
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 230,
    height: 56,
    borderRadius: '25px',
    marginTop: 30,
    fontSize: 14,
    fontWeight: 'bold',
  },
}));

export default useStyles;
