import { Box, Grid, Typography } from '@material-ui/core';
import { useState } from 'react';
import useStyles from './useStyles';
import ShoppingList from '../../components/ShoppingList/ShoppingList';
import AddIcon from '@material-ui/icons/Add';

import AddNewListDialog from '../../components/AddNewListDialog/AddNewListDialog';
import { ListInterface } from '../../interface/List';

interface Props {
  userId: string;
  lists: ListInterface[];
  setLists: React.Dispatch<React.SetStateAction<ListInterface[]>>;
}

export default function ShoppingLists({ userId, lists, setLists }: Props): JSX.Element {
  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container justify="flex-start" alignItems="flex-start" direction="column" className={classes.root}>
      <Typography variant="h6">
        <Box fontWeight={700}>My Shopping Lists</Box>
      </Typography>
      <Grid container item direction="row" justify="center">
        {lists.length > 0 &&
          lists.map((list: ListInterface) => {
            return (
              <ShoppingList
                key={list._id}
                title={list.name}
                image={list.image}
                numberOfItems={list.products.length}
                isPrivate={list.isPrivate}
              />
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
      <AddNewListDialog open={open} setOpen={setOpen} setLists={setLists} handleClose={handleClose} userId={userId} />
    </Grid>
  );
}
