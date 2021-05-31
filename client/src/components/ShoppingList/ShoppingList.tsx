import { Box, Grid, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

//this is for the case we do not have an image for the shopping list
import placeholderImage from '../../Images/placeholder-image.png';
import { useState } from 'react';
import ListDetailDialog from '../ListDetailDialog/ListDetailDialog';
import { ListInterface } from '../../interface/List';

interface Props {
  list: ListInterface;
  setSelectedList: React.Dispatch<React.SetStateAction<ListInterface | undefined>>;
  handleListDetailOpen: () => void;
}

export default function ShoppingList({ list, setSelectedList, handleListDetailOpen }: Props): JSX.Element {
  const classes = useStyles();
  const { image, isPrivate, name, products } = list;

  const handleClick = () => {
    setSelectedList(list);
    handleListDetailOpen();
  };

  return (
    <Grid
      container
      item
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.root}
      onClick={handleClick}
    >
      <Grid
        item
        className={classes.imageContainer}
        style={{ backgroundImage: `url(${image ? image : placeholderImage})` }}
      ></Grid>
      <Grid item container direction="row" justify="center" alignItems="center" className={classes.titleContainer}>
        <Box fontWeight={700} mr={1}>
          <Typography>{name}</Typography>
        </Box>
        {isPrivate ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </Grid>
      <Grid item>
        <Box fontWeight={300} mb={2}>
          <Typography variant="subtitle2" color="textSecondary">
            {products.length} items
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
