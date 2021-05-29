import { Box, Button, Grid, MenuItem, Select, Typography } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import React, { useState } from 'react';
import { ListInterface } from '../../interface/List';
import useStyles from './useStyles';

interface Props {
  lists: ListInterface[];
}

export default function AddNewItem({ lists }: Props): JSX.Element {
  const classes = useStyles();
  const [list, setList] = useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setList(event.target.value as string);
  };

  return (
    <Grid container justify="center" alignItems="center" direction="column" className={classes.root}>
      <Typography variant="h5">
        <Box fontWeight={700}>Add new item:</Box>
      </Typography>
      <form className={classes.form}>
        <Input disableUnderline={true} placeholder="Paste your link here" className={classes.input}></Input>

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
            <MenuItem key={index} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="primary" className={classes.addBtn}>
          ADD
        </Button>
      </form>
    </Grid>
  );
}
