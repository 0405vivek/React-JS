import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function InputText(props) {
  return (
    <Box
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
    >
      <TextField
        id="outlined-basic"
        name={props.name}
        label={props.label}
        type={props.type}
        variant="outlined"
        value={props.value}       
        onChange={props.onChange} 
        multiline={props.isTextArea || false}
        rows={props.rows || 4}
        error={!!props.error}     
        helperText={props.error}  
      />
    </Box>
  );
}
