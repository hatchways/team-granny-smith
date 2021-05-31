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
  handleClose: () => void;
}

export default function ListDetailDialog({ open, setOpen, setLists, list, handleClose }: Props): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const [showProducts, setShowProducts] = useState(true);
  const [showAddNewItem, setShowAddNewItem] = useState(false);
  const [listState, setListState] = useState<ListInterface>(list);
  // This will launch only if propName value has chaged.

  const [newListTitle, setNewListTitle] = useState<string>('');
  const [newListImage, setNewListImage] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(true);

  //   const handleNewListTitleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //     setTitleError('');
  //     setNewListTitle(event.target.value as string);
  //   };

  //   const handlePrivacyChange = () => {
  //     setIsPrivate(!isPrivate);
  //   };

  //   const handleUpload = async (files: File[]) => {
  //     const file = files[0];
  //     const formData = new FormData();
  //     formData.append('image', file);
  //     setUploading(true);
  //     try {
  //       const data = await uploadImage(formData);
  //       setNewListImage(data.imageUrl);
  //       setUploading(false);
  //     } catch (error) {
  //       setUploading(false);
  //       updateSnackBarMessage('There was a problem uploading your picture. Accepted formats are jpg and png');
  //     }
  //   };

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

  const handleBackButton = () => {
    setShowProducts((prev) => !prev);
    setShowAddNewItem((prev) => !prev);
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
          {' '}
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
                  {'sdfkjdsahdfksj'}
                </Box>
              </Typography>
              {list.isPrivate ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </Grid>
            <Grid item container justify="center">
              <Box fontWeight={300} mb={2}>
                <Typography color="textSecondary" variant="subtitle2">
                  {list.products.length} items
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <DialogContent className={classes.dialogContent}>
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n')}
          </DialogContent>
          <DialogActions>
            <Grid container justify="center">
              <Button onClick={handleAddNewItem} color="primary">
                ADD NEW ITEM
              </Button>
            </Grid>
          </DialogActions>
        </Grid>
      </Slide>
    </Dialog>
  );
}
