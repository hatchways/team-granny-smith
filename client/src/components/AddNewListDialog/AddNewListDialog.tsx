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
import Dropzone from 'react-dropzone';
import CloseIcon from '@material-ui/icons/Close';
import createNewList from '../../helpers/APICalls/createNewList';
import uploadImage from '../../helpers/APICalls/uploadImage';

//this is for the case we do not have an image for the shopping list
import placeholderImage from '../../Images/placeholder-image.png';
import { ListInterface } from '../../helpers/APICalls/getUserLists';
import { useSnackBar } from '../../context/useSnackbarContext';

interface Props {
  open: boolean;
  userId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLists: React.Dispatch<React.SetStateAction<ListInterface[]>>;
  lists: ListInterface[];
  handleClose: () => void;
}

export default function AddNewListDialog({ open, userId, setOpen, setLists, lists, handleClose }: Props): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  const [newListTitle, setNewListTitle] = React.useState<string>('');
  const [newListImage, setNewListImage] = React.useState<string>('');
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [titleError, setTitleError] = React.useState<string>('');

  const handleNewListTitleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTitleError('');
    setNewListTitle(event.target.value as string);
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

  return (
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
  );
}
