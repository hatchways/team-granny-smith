import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import * as React from 'react';
import useStyles from './useStyles';
import ShoppingList from '../../components/ShoppingList/ShoppingList';
import AddIcon from '@material-ui/icons/Add';

//These static images are temporary
import furnitureImage from '../../Images/furniture.png';
import clothesImage from '../../Images/clothes.png';

//this is for the case we do not have an image for the shopping list
import placeholderImage from '../../Images/placeholder-image.png';

export default function ShoppingLists(): JSX.Element {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [newListTitle, setNewListTitle] = React.useState('');
  const [newListImage, setNewListImage] = React.useState('');

  const handleNewListTitleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNewListTitle(event.target.value as string);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container justify="flex-start" alignItems="flex-start" direction="column" className={classes.root}>
      <Typography variant="h6">
        {' '}
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
          onClick={handleClickOpen}
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
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle>
          {' '}
          <Typography variant="h5">
            <Box fontWeight={700} textAlign="center" m={2}>
              Create new list{' '}
            </Box>
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Grid container direction="column" justify="center" alignItems="center">
            <form className={classes.form}>
              <FormHelperText className={classes.label}>Add a title</FormHelperText>
              <TextField
                id="email"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  classes: { input: classes.inputs },
                  disableUnderline: true,
                }}
                name="title"
                placeholder="Enter name"
                // helperText={touched.email ? errors.email : ''}
                // error={touched.email && Boolean(errors.email)}
                value={newListTitle}
                onChange={handleNewListTitleChange}
              />{' '}
            </form>
            <Grid item>
              <Typography variant="subtitle1">
                <Box fontWeight={700} textAlign="center" mt={3}>
                  Add a cover
                </Box>
              </Typography>
            </Grid>
            <Grid container item direction="column" justify="center" alignItems="center" className={classes.uploadBox}>
              <Grid
                item
                className={classes.imageContainer}
                style={{ backgroundImage: `url(${newListImage ? newListImage : placeholderImage})` }}
              ></Grid>
              <Grid item>
                <Typography variant="caption">
                  <Box fontWeight={300} textAlign="center" mb={2} px={2}>
                    Drop an image here or{' '}
                    <b>
                      <u>select a file</u>
                    </b>
                  </Box>
                </Typography>
              </Grid>
            </Grid>

            <Button onClick={handleClose} color="primary" variant="contained" className={classes.createButton}>
              CREATE LIST
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
