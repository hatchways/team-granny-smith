import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Slide,
  TextField,
  Typography,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import useStyles from './useStyles';
import CloseIcon from '@material-ui/icons/Close';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useSnackBar } from '../../context/useSnackbarContext';
import { ListInterface } from '../../interface/List';
import ProductCard from '../ProductCard/ProductCard';
import { createNewProduct } from '../../helpers/APICalls/product';
import { ProductInterface } from '../../interface/Product';
import { validateUrl } from '../../helpers/validateUrl';

interface Props {
  open: boolean;
  //   userId: string;
  setLists: React.Dispatch<React.SetStateAction<ListInterface[]>>;
  list: ListInterface;
  lists: ListInterface[];
  handleClose: () => void;
}

export default function ListDetailDialog({ open, setLists, list, lists, handleClose }: Props): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const [showProducts, setShowProducts] = useState(true);
  const [showAddNewItem, setShowAddNewItem] = useState(false);
  const [listState, setListState] = useState<ListInterface>(list);
  const [newItemUrl, setNewItemUrl] = useState('');
  const [urlError, setUrlError] = useState<string>('');
  const [selectedList, setSelectedList] = useState(list._id);
  const [newProductImageUrl, setNewProductImageUrl] = useState(
    'https://images-na.ssl-images-amazon.com/images/I/51RRK1PHUOL._AC_SX425_.jpg',
  );
  const [newProductName, setNewProductName] = useState('Microsoft Sculpt Ergonomic Keyboard for Business (5KV-00001)');
  const [newProdutPrice, setNewProdutPrice] = useState('$79.83');
  const [showNewProductData, setShowNewProductData] = useState(false);

  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    setListState(list);
  }, [list]);

  const handleNewItemUrlChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUrlError('');
    setNewItemUrl(event.target.value as string);
  };

  const handleSelectedListChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedList(event.target.value as string);
  };
  const handleSubmit = async () => {
    if (!newItemUrl) {
      setUrlError('Please enter a url');
      return;
    } else if (!validateUrl(newItemUrl)) {
      setUrlError('Please enter a valid url');
      return;
    }

    if (submitting) {
      return;
    }

    setSubmitting(true);
    try {
      const data = await createNewProduct(newItemUrl, selectedList);
      setSubmitting(false);
      setNewProductImageUrl(data.imageUrl);
      setNewProductName(data.name);
      setNewProdutPrice(data.originalPrice);
      setShowNewProductData(true);
      //cleaning the name field and the image uploaded
      setNewItemUrl('');

      //adding the product to our lists
      setLists((lists) => {
        const newLists: ListInterface[] = [];
        lists.forEach((list) => {
          if (list._id === selectedList) {
            const newProducts = [...list.products, data];
            const newList = { ...list, products: newProducts };
            setListState(newList);
            newLists.push(newList);
          } else {
            newLists.push(list);
          }
        });
        return newLists;
      });
    } catch (error) {
      console.error(error);
      updateSnackBarMessage(error);
      setSubmitting(false);
    }
  };

  const handleAddNewItem = () => {
    setShowAddNewItem((prev) => !prev);
    setShowProducts((prev) => !prev);
  };

  const handleConfirm = () => {
    setShowNewProductData(false);
    updateSnackBarMessage('Item added successfully');
    handleAddNewItem();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      scroll="paper"
      classes={{ paper: classes.dialogPaper }}
    >
      <Box ml={'auto'} textAlign={'right'} m={2} className={classes.closeContainer}>
        <CloseIcon className={classes.closeIcon} onClick={handleClose} />
      </Box>
      <Slide
        direction="right"
        in={showProducts}
        mountOnEnter
        unmountOnExit
        timeout={{ appear: 600, enter: 600, exit: 300 }}
      >
        <Grid className={classes.productsContainer}>
          <Grid container justify="center" direction="column">
            <Grid
              item
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.titleContainer}
            >
              <Typography variant="h5">
                <Box fontWeight={700} mr={1}>
                  {list.name}
                </Box>
              </Typography>
              {list.isPrivate ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </Grid>
            <Grid item container justify="center">
              <Box fontWeight={300} mb={2}>
                <Typography color="textSecondary" variant="subtitle2">
                  {listState.products.length} items
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <DialogContent className={classes.dialogContent}>
            {listState.products.length > 0 ? (
              listState.products.map((product: ProductInterface) => {
                return (
                  <ProductCard
                    product={product}
                    key={product._id}
                    listId={list._id}
                    setLists={setLists}
                    setListState={setListState}
                  />
                );
              })
            ) : (
              <Box textAlign="center" height="100%" display="flex" justifyContent="center" alignItems="center">
                <Typography variant="subtitle2">
                  {'There are no items in this list. Please add new items by pressing the button below.'}
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Grid container justify="center">
              <Button onClick={handleAddNewItem} variant="contained" color="primary" className={classes.addButton}>
                ADD NEW ITEM
              </Button>
            </Grid>
          </DialogActions>
        </Grid>
      </Slide>
      <Slide
        direction="left"
        in={showAddNewItem}
        mountOnEnter
        unmountOnExit
        timeout={{ appear: 600, enter: 600, exit: 300 }}
      >
        <Grid>
          <Grid>
            <Typography variant="h5">
              <Box fontWeight={700} textAlign="center" mb={2}>
                Add new item:{' '}
              </Box>
            </Typography>
          </Grid>
          {showNewProductData ? (
            <>
              <DialogContent className={classes.dialogContent}>
                <Grid container direction="column" justify="center" alignItems="center">
                  <img src={newProductImageUrl} alt="product-image" className={classes.image} />
                  <Grid container item direction="column" xs>
                    <Typography variant="subtitle1">
                      <Box fontWeight={700}>{newProductName}</Box>
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="subtitle1">
                  <Box mr={1}>{newProdutPrice}</Box>
                </Typography>
              </DialogContent>
              <Grid container justify="center">
                <Button onClick={handleConfirm} color="primary" variant="contained" className={classes.createButton}>
                  Confirm
                </Button>
              </Grid>
            </>
          ) : (
            <>
              <DialogContent className={classes.dialogContent}>
                <Grid container direction="column" justify="center" alignItems="center">
                  <form className={classes.form}>
                    <FormHelperText className={classes.label}>
                      Paste link to item: <span className={classes.required}>*</span>
                    </FormHelperText>
                    <TextField
                      id="url"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        classes: { input: classes.inputs },
                        disableUnderline: true,
                      }}
                      helperText={urlError ? urlError : ''}
                      name="title"
                      placeholder="Paste url"
                      value={newItemUrl}
                      onChange={handleNewItemUrlChange}
                    />{' '}
                  </form>
                  <Grid item>
                    <Typography variant="subtitle1">
                      <Box fontWeight={700} textAlign="center" mt={3}>
                        Select List
                      </Box>
                    </Typography>
                  </Grid>
                  <Select
                    value={selectedList as string}
                    onChange={handleSelectedListChange}
                    disableUnderline
                    displayEmpty
                    className={classes.select}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="" disabled>
                      Select list
                    </MenuItem>
                    {lists.map((item, index) => (
                      <MenuItem key={index} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </DialogContent>
              <Grid container justify="center" className={classes.buttonContainer}>
                <IconButton aria-label="delete" className={classes.backButton} onClick={handleAddNewItem}>
                  <ArrowBackIcon fontSize="large" />
                </IconButton>
                <Button
                  endIcon={submitting ? <CircularProgress className={classes.buttonSpinner} /> : undefined}
                  onClick={handleSubmit}
                  color="primary"
                  variant="contained"
                  className={classes.createButton}
                >
                  CREATE LIST
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Slide>
    </Dialog>
  );
}
