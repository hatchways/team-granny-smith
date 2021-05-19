import { Box, Button, Grid, MenuItem, Select, Typography } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import * as React from 'react';
import useStyles from './useStyles';

export default function AddNewItem(): JSX.Element {
  const classes = useStyles();
  const [list, setList] = React.useState('');
  const [lists] = React.useState(['Clothes', 'Furniture', 'Luxury']);

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
          {lists.map((item: string, index: number) => (
            <MenuItem key={index} value={item}>
              {item}
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
