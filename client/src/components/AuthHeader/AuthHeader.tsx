import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';

interface Props {
  linkTo: string;
  asideText: string;
  linkText: string;
}

const AuthHeader = ({ linkTo, asideText, linkText }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Box p={1} className={classes.authHeader}>
      <Typography className={classes.accAside}>{asideText}</Typography>
      <span>&#160;&#160;</span>
      <Link to={linkTo} className={classes.link}>
        {linkText}
      </Link>
    </Box>
  );
};

export default AuthHeader;
