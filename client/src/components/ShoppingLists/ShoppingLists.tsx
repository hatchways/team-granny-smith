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

//this is for the case we do not have an image for the shopping list
import placeholderImage from '../../Images/placeholder-image.png';

import uploadImage from '../../helpers/APICalls/uploadImage';
import Dropzone from 'react-dropzone';
import createNewList from '../../helpers/APICalls/createNewList';
import { useSnackBar } from '../../context/useSnackbarContext';
import getUserLists from '../../helpers/APICalls/getUserLists';
import { ListInterface } from '../../helpers/APICalls/getUserLists';

interface Props {
  userId: string;
}

export default function ShoppingLists({ userId }: Props): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  const [lists, setLists] = React.useState<ListInterface[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [newListTitle, setNewListTitle] = React.useState<string>('');
  const [newListImage, setNewListImage] = React.useState<string>('');
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [titleError, setTitleError] = React.useState<string>('');

  const handleNewListTitleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTitleError('');
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
      setSubmitting(false);
      updateSnackBarMessage('List added successfully');
      setOpen(false);

      //cleaning the name field and the image uploaded
      setNewListTitle('');
      setNewListImage('');

      setLists([...lists, data]);
    } catch (error) {
      console.error(error);
      updateSnackBarMessage(error);
      setSubmitting(false);
    }
  };

  React.useEffect(() => {
    getUserLists(userId)
      .then((response) => {
        console.log(response.data);
        setLists(response.data);
      })
      .catch(() => {
        updateSnackBarMessage('There was a problem fetching your lists');
      });

    return () => {
      setNewListTitle('');
    };
  }, []);

  return (
    <Grid container justify="flex-start" alignItems="flex-start" direction="column" className={classes.root}>
      <Typography variant="h6">
        {' '}
        <Box fontWeight={700}>My Shopping Lists</Box>
      </Typography>
      <Grid container item direction="row">
        {lists.length > 0 &&
          lists.map((list: ListInterface) => {
            return (
              <ShoppingList key={list._id} title={list.name} image={list.image} numberOfItems={list.products.length} />
            );
          })}
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
