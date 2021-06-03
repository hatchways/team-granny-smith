import { Box, Button, CircularProgress, Grid, Link, Typography } from '@material-ui/core';
import useStyles from './useStyles';

import { ProductInterface } from '../../interface/Product';

//this is for the case we do not have an image for the shopping list
import placeholderImage from '../../Images/placeholder-image.png';
import { useState } from 'react';
import { deleteProduct } from '../../helpers/APICalls/product';
import { ListInterface } from '../../interface/List';
import { useSnackBar } from '../../context/useSnackbarContext';

export interface Props {
  product: ProductInterface;
  listId: string;
  setLists: React.Dispatch<React.SetStateAction<ListInterface[]>>;
  setListState: React.Dispatch<React.SetStateAction<ListInterface>>;
}

export default function ProductCard({ product, listId, setLists, setListState }: Props): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  const [loading, setLoading] = useState(false);

  const { name, imageUrl, originalPrice, salePrice, _id, url } = product;

  const handleRemove = async () => {
    setLoading(true);
    try {
      await deleteProduct(_id, listId);

      //removing the product from our lists
      setLists((lists) => {
        const newLists: ListInterface[] = [];
        lists.forEach((list) => {
          if (list._id === listId) {
            const newProducts = list.products.filter((product) => {
              return product._id !== _id;
            });
            const newList = { ...list, products: newProducts };
            newLists.push(newList);
            setListState(newList);
          } else {
            newLists.push(list);
          }
        });
        return newLists;
      });

      updateSnackBarMessage('Item removed successfuly');
    } catch (error) {
      updateSnackBarMessage(error);
      setLoading(false);
    }
  };

  return (
    <Grid container item direction="row" justify="center" alignItems="center" wrap="nowrap" className={classes.root}>
      <Grid
        item
        className={classes.imageContainer}
        style={{ backgroundImage: `url(${imageUrl ? imageUrl : placeholderImage})` }}
      ></Grid>
      <Grid container item direction="column" xs>
        <Typography variant="subtitle1">
          <Box fontWeight={700}>{name}</Box>
        </Typography>
        <Typography variant="caption" color="textSecondary" className={classes.urlContainer}>
          <Link href={url} color="inherit">
            {url}
          </Link>
        </Typography>
        <Grid item container direction="row">
          <Typography variant="subtitle1">
            <Box fontWeight={700} className={salePrice ? `${classes.lineThroughText}` : ''} mr={1}>
              {originalPrice}
            </Box>
          </Typography>
          {salePrice && (
            <Typography variant="subtitle1" color="primary">
              <Box fontWeight={700}>{salePrice}</Box>
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid>
        <Box mx={1}>
          <Button variant="outlined" onClick={handleRemove} className={classes.removeButton}>
            {loading ? <CircularProgress className={classes.buttonSpinner} /> : 'REMOVE'}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
