import { Button, Grid, MenuItem, Select, Typography } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import * as React from 'react';
import useStyles from './useStyles';

export default function AddNewItem(): JSX.Element {
  const classes = useStyles();
  const [list, setList] = React.useState('Select list');
  const [lists, setLists] = React.useState(['Clothes', 'Furniture', 'Luxury']);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setList(event.target.value as string);
  };

  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <Typography variant="h6">Add new item:</Typography>
      <form className={classes.form}>
        <Input disableUnderline={true} placeholder="Paste your link here" className={classes.input}></Input>

        <Select
          disableUnderline
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={list as string}
          onChange={handleChange}
          className={classes.select}
        >
          <MenuItem value="Select List" selected>
            Select list
          </MenuItem>
          {lists.map((item: string, index: number) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="primary" style={{ margin: '.5rem', width: '7rem' }}>
          ADD
        </Button>
      </form>
    </Grid>
  );
}
