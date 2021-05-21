import { Box, Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import useStyles from './useStyles';
import ShoppingList from '../../components/ShoppingList/ShoppingList';
import AddIcon from '@material-ui/icons/Add';

//These static images are temporary
import furnitureImage from '../../Images/furniture.png';
import clothesImage from '../../Images/clothes.png';

export default function ShoppingLists(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container justify="flex-start" alignItems="flex-start" direction="column" className={classes.root}>
      <Typography variant="h6">
        <Box fontWeight={700}>My Shopping Lists</Box>
      </Typography>
      <Grid container item direction="row">
        <ShoppingList title="Clothes" image={clothesImage} numberOfItems={32} />
        <ShoppingList title="Furniture" image={furnitureImage} numberOfItems={4} />
        <ShoppingList title="Luxury" numberOfItems={8} />
        <Grid
          container
          item
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.addNewListContainer}
        >
          <Grid item>
            <Typography variant="subtitle1">
              <Box fontWeight={700} mt={2}>
                <AddIcon className={classes.addIcon} />
              </Box>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">
              <Box fontWeight={700} mb={2}>
                ADD NEW LIST
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
