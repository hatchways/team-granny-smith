import { Box, Grid, Typography } from '@material-ui/core';
import useStyles from './useStyles';

//this is for the case we do not have an image for the shopping list
import placeholderImage from '../../Images/placeholder-image.png';

interface Props {
  title: string;
  numberOfItems: number;
  image?: string;
}

export default function ShoppingList({ title, image, numberOfItems }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container item direction="column" justify="center" alignItems="center" className={classes.root}>
      <Grid
        item
        className={classes.imageContainer}
        style={{ backgroundImage: `url(${image ? image : placeholderImage})` }}
      ></Grid>
      <Grid item>
        <Typography variant="subtitle1">
          <Box fontWeight={700} mt={2}>
            {title}
          </Box>
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle2">
          <Box fontWeight={300} mb={2}>
            {numberOfItems} items
          </Box>
        </Typography>
      </Grid>
    </Grid>
  );
}
