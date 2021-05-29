import { Box, Grid, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

//this is for the case we do not have an image for the shopping list
import placeholderImage from '../../Images/placeholder-image.png';

interface Props {
  title: string;
  numberOfItems: number;
  isPrivate: boolean;
  image?: string;
}

export default function ShoppingList({ title, image, isPrivate, numberOfItems }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container item direction="column" justify="center" alignItems="center" className={classes.root}>
      <Grid
        item
        className={classes.imageContainer}
        style={{ backgroundImage: `url(${image ? image : placeholderImage})` }}
      ></Grid>
      <Grid item container direction="row" justify="center" alignItems="center" className={classes.titleContainer}>
        <Box fontWeight={700} mr={1}>
          <Typography>{title}</Typography>
        </Box>
        {isPrivate ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </Grid>
      <Grid item>
        <Box fontWeight={300} mb={2}>
          <Typography variant="subtitle2">{numberOfItems} items</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
