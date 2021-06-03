import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Fade,
  FormControlLabel,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Slide,
  TextField,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import useStyles from './useStyles';
import Dropzone from 'react-dropzone';
import CloseIcon from '@material-ui/icons/Close';
import createNewList from '../../helpers/APICalls/createNewList';
import uploadImage from '../../helpers/APICalls/uploadImage';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

//this is for the case we do not have an image for the shopping list
import placeholderImage from '../../Images/placeholder-image.png';
import { useSnackBar } from '../../context/useSnackbarContext';
import { ListInterface } from '../../interface/List';
import ProductCard from '../ProductCard/ProductCard';
import { ProductInterface } from '../../helpers/APICalls/product';

interface Props {
  open: boolean;
  //   userId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLists: React.Dispatch<React.SetStateAction<ListInterface[]>>;
  list: ListInterface;
  lists: ListInterface[];
  handleClose: () => void;
}

export default function ListDetailDialog({ open, setOpen, setLists, list, lists, handleClose }: Props): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const [showProducts, setShowProducts] = useState(true);
  const [showAddNewItem, setShowAddNewItem] = useState(false);
  const [listState, setListState] = useState<ListInterface>(list);
  const [newItemUrl, setNewItemUrl] = useState('');
  const [urlError, setUrlError] = useState<string>('');
  const [selectedList, setSelectedList] = useState(list._id);

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleNewItemUrlChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUrlError('');
    setNewItemUrl(event.target.value as string);
  };

  const handleSelectedListChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedList(event.target.value as string);
  };
  //   const handleSubmit = async () => {
  //     if (!newListTitle) {
  //       setTitleError('Please enter a name');
  //       return;
  //     } else if (newListTitle.length > 30) {
  //       setTitleError('Name should not be more than 30 characters long');
  //       return;
  //     }

  //     setSubmitting(true);
  //     try {
  //       const data = await createNewList(newListTitle, userId, isPrivate, newListImage);
  //       setSubmitting(false);
  //       updateSnackBarMessage('List added successfully');
  //       setOpen(false);

  //       //cleaning the name field and the image uploaded
  //       setNewListTitle('');
  //       setNewListImage('');

  //       setLists((current) => {
  //         return [...current, data];
  //       });
  //     } catch (error) {
  //       console.error(error);
  //       updateSnackBarMessage(error);
  //       setSubmitting(false);
  //     }
  //   };

  const handleAddNewItem = () => {
    setShowAddNewItem((prev) => !prev);
    setShowProducts((prev) => !prev);
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
        timeout={{ appear: 800, enter: 800, exit: 300 }}
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
        timeout={{ appear: 800, enter: 800, exit: 300 }}
      >
        <Grid>
          <Grid>
            <Typography variant="h5">
              <Box fontWeight={700} textAlign="center" m={2}>
                Add new item:{' '}
              </Box>
            </Typography>
          </Grid>
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
                  placeholder="Enter name"
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
          <Grid container justify="center">
            <Button
              endIcon={submitting ? <CircularProgress className={classes.buttonSpinner} /> : undefined}
              // onClick={handleSubmit}
              color="primary"
              variant="contained"
              className={classes.createButton}
            >
              CREATE LIST
            </Button>
          </Grid>
        </Grid>
      </Slide>
    </Dialog>
  );
}
