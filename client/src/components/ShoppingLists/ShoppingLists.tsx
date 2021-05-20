import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import * as React from 'react';
import useStyles from './useStyles';
import ShoppingList from '../../components/ShoppingList/ShoppingList';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

//These static images are temporary
import furnitureImage from '../../Images/furniture.png';
import clothesImage from '../../Images/clothes.png';

//this is for the case we do not have an image for the shopping list
import placeholderImage from '../../Images/placeholder-image.png';
import uploadImage from '../../helpers/APICalls/uploadImage';
import Dropzone from 'react-dropzone';
import createNewList from '../../helpers/APICalls/createNewList';

interface Props {
  userId: string;
}

export default function ShoppingLists({ userId }: Props): JSX.Element {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [newListTitle, setNewListTitle] = React.useState('');
  const [newListImage, setNewListImage] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [titleError, setTitleError] = React.useState('');

  const handleNewListTitleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNewListTitle(event.target.value as string);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = async (files: File[]) => {
    const file = files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const data = await uploadImage(formData);
      setNewListImage(data.imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!newListTitle) {
      setTitleError('Please enter a name');
      return;
    } else if (newListTitle.length > 30) {
      setTitleError('Name should not be more than 30 characters long');
      return;
    }

    setSubmitting(true);
    try {
      const data = await createNewList(newListTitle, userId, newListImage);
      console.log(data);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
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
        <Grid>
          {' '}
          <Box ml={'auto'} textAlign={'right'} m={2}>
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          </Box>
          <Typography variant="h5">
            <Box fontWeight={700} textAlign="center" m={2}>
              Create new list{' '}
            </Box>
          </Typography>
        </Grid>
        <DialogContent className={classes.dialogContent}>
          <Grid container direction="column" justify="center" alignItems="center">
            <form className={classes.form}>
              <FormHelperText className={classes.label}>
                Add a title <span className={classes.required}>*</span>
              </FormHelperText>
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
                helperText={titleError ? titleError : ''}
                name="title"
                placeholder="Enter name"
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
            <Dropzone onDrop={(acceptedFiles) => handleUpload(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Grid
                      container
                      item
                      direction="column"
                      justify="center"
                      alignItems="center"
                      className={classes.uploadBox}
                    >
                      <Grid
                        item
                        className={classes.imageContainer}
                        style={{ backgroundImage: `url(${newListImage ? newListImage : placeholderImage})` }}
                      ></Grid>
                      <Grid item>
                        <Typography variant="caption">
                          <Box fontWeight={300} textAlign="center" mb={2} mt={1} px={2}>
                            Drop an image here or{' '}
                            <b>
                              <u>select a file</u>
                            </b>
                          </Box>
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                </section>
              )}
            </Dropzone>

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
        </DialogContent>
      </Dialog>
    </Grid>
  );
}