import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  logo: {
    height: '2rem',
    paddingLeft: '1.5rem',
  },
  navBar: {
    position: 'sticky',
    backgroundColor: 'white',
    boxShadow: '0px 0px 2px 0px #d5d5d5',
    height: '4rem',
  },
  navBarItem: {
    margin: '.5rem',
    fontWeight: 300,
  },
  navbarItemActive: {
    fontWeight: 700,
  },
  profileWrapper: {
    margin: 'auto',
    width: 'auto',
  },
  profileButton: {
    width: 100,
  },
  profilePicture: {
    borderRadius: '50%',
    height: '2.5rem',
    display: 'block',
  },
}));

export default useStyles;
