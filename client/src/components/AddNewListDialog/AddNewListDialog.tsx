import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import useStyles from './useStyles';
import Dropzone from 'react-dropzone';
import CloseIcon from '@material-ui/icons/Close';
import createNewList from '../../helpers/APICalls/createNewList';
import uploadImage from '../../helpers/APICalls/uploadImage';

//this is for the case we do not have an image for the shopping list
import placeholderImage from '../../Images/placeholder-image.png';
import { useSnackBar } from '../../context/useSnackbarContext';
import { ListInterface } from '../../interface/List';

interface Props {
  open: boolean;
  userId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLists: React.Dispatch<React.SetStateAction<ListInterface[]>>;
  handleClose: () => void;
}

export default function AddNewListDialog({ open, userId, setOpen, setLists, handleClose }: Props): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  const [newListTitle, setNewListTitle] = useState<string>('');
  const [newListImage, setNewListImage] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(true);

  const handleNewListTitleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTitleError('');
    setNewListTitle(event.target.value as string);
  };

  const handlePrivacyChange = () => {
    setIsPrivate(!isPrivate);
  };

  const handleUpload = async (files: File[]) => {
    const file = files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const data = await uploadImage(formData);
      setNewListImage(data.imageUrl);
      setUploading(false);
    } catch (error) {
      setUploading(false);
      updateSnackBarMessage('There was a problem uploading your picture. Accepted formats are jpg and png');
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
      const data = await createNewList(newListTitle, userId, isPrivate, newListImage);
      setSubmitting(false);
      updateSnackBarMessage('List added successfully');
      setOpen(false);

      //cleaning the name field and the image uploaded
      setNewListTitle('');
      setNewListImage('');

      setLists((current) => {
        return [...current, data];
      });
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
            <FormControlLabel
              control={<Checkbox checked={isPrivate} onChange={handlePrivacyChange} name="isPrivate" color="primary" />}
              label="Private List"
            />
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
                    {uploading ? (
                      <Box m={4} p={4}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <>
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
                      </>
                    )}
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
