import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Typography,
  Modal,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import Input from '@material-ui/core/Input';
import React, { useState } from 'react';
import { ListInterface } from '../../interface/List';
import useStyles from './useStyles';
import { ProductInterface, createNewProduct } from '../../helpers/APICalls/product';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert';

interface Props {
  lists: ListInterface[];
}

export default function AddNewItem({ lists }: Props): JSX.Element {
  const classes = useStyles();
  const [list, setList] = useState('');
  const [openNewItemModal, setOpenNewItemModal] = useState(false);
  const [newItemUrl, setNewItemUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    openSnackbar: false,
    notification: '',
    severity: 'info',
  });
  const [product, setProduct] = useState({
    name: '',
    price: '',
    imageUrl: '',
  });

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setList(event.target.value as string);
  };

  const handleUrlChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNewItemUrl(event.target.value as string);
  };

  const handleOpen = () => {
    if (!isLoading) {
      if (newItemUrl == '') {
        setSnackbar({
          openSnackbar: true,
          notification: 'Enter a product URL first!',
          severity: 'info',
        });
      } else if (list == '') {
        setSnackbar({
          openSnackbar: true,
          notification: 'Please select a list!',
          severity: 'info',
        });
      } else {
        setIsLoading(true);
        createNewProduct(newItemUrl, list).then((res: ProductInterface) => {
          setIsLoading(false);
          setProduct({
            name: res.name,
            price: res.price,
            imageUrl: res.imageUrl,
          });
          setOpenNewItemModal(true);
        });
      }
    }
  };

  const handleClose = () => {
    setOpenNewItemModal(false);
    setSnackbar({
      openSnackbar: true,
      notification: 'Product added to list',
      severity: 'success',
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({
      openSnackbar: false,
      notification: '',
      severity: 'info',
    });
  };

  return (
    <Grid container justify="center" alignItems="center" direction="column" className={classes.root}>
      <Typography variant="h5">
        <Box fontWeight={700}>Add new item:</Box>
      </Typography>
      <form className={classes.form}>
        <Input
          disableUnderline={true}
          placeholder="Paste your link here"
          className={classes.input}
          onChange={handleUrlChange}
        ></Input>

        <Select
          value={list as string}
          onChange={handleChange}
          disableUnderline
          displayEmpty
          className={`${classes.select} ${list === '' ? classes.selectInitialState : ''}`}
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
        <Button variant="contained" color="primary" className={classes.addBtn} onClick={handleOpen}>
          {isLoading ? <CircularProgress size={20} className={classes.loadingProgress} /> : 'ADD'}
        </Button>
      </form>
      <Modal open={openNewItemModal}>
        <Dialog open={openNewItemModal}>
          <DialogTitle className={classes.productName}>
            <Box fontWeight={700}>{product.name}</Box>
          </DialogTitle>
          <DialogContent>
            <Grid container justify="center" alignItems="center" direction="column">
              <img
                src={product.imageUrl}
                alt="https://team-granny-smith-s3.s3.ca-central-1.amazonaws.com/default-images/no-image.jpg"
              />
            </Grid>
            <DialogContentText className={classes.productPrice}>Price: {product.price}</DialogContentText>
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button onClick={handleClose} color="primary" variant="contained">
              CONFIRM
            </Button>
          </DialogActions>
        </Dialog>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbar.openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={snackbar.severity as Color}>{snackbar.notification}</Alert>
      </Snackbar>
    </Grid>
  );
}
