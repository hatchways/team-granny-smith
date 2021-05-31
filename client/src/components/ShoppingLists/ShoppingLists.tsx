import { Box, Grid, Typography } from '@material-ui/core';
import { useState } from 'react';
import useStyles from './useStyles';
import ShoppingList from '../../components/ShoppingList/ShoppingList';
import AddIcon from '@material-ui/icons/Add';

import AddNewListDialog from '../../components/AddNewListDialog/AddNewListDialog';
import { ListInterface } from '../../interface/List';
import ListDetailDialog from '../ListDetailDialog/ListDetailDialog';

interface Props {
  userId: string;
  lists: ListInterface[];
  setLists: React.Dispatch<React.SetStateAction<ListInterface[]>>;
}

export default function ShoppingLists({ userId, lists, setLists }: Props): JSX.Element {
  const classes = useStyles();

  const [addNewListOpen, setAddNewListOpen] = useState<boolean>(false);
  const [listDetailOpen, setListDetailOpen] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState<ListInterface>();
  const handleListDetailOpen = () => {
    setListDetailOpen(true);
  };

  const handleListDetailClose = () => {
    setListDetailOpen(false);
  };

  const handleAddNewListOpen = () => {
    setAddNewListOpen(true);
  };

  const handleAddNewListClose = () => {
    setAddNewListOpen(false);
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
                list={list}
                handleListDetailOpen={handleListDetailOpen}
                setSelectedList={setSelectedList}
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
          onClick={handleAddNewListOpen}
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
      <AddNewListDialog
        open={addNewListOpen}
        setOpen={setAddNewListOpen}
        setLists={setLists}
        handleClose={handleAddNewListClose}
        userId={userId}
      />
      {selectedList && (
        <ListDetailDialog
          open={listDetailOpen}
          setOpen={setListDetailOpen}
          setLists={setLists}
          handleClose={handleListDetailClose}
          list={selectedList}
        />
      )}
    </Grid>
  );
}
