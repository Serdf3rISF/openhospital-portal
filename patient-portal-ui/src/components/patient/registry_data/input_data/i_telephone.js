import React, { Component } from "react";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

class i_telephone extends Component {
    render() {
        return (
            <TextField
                label="Cell"
                id="i_telephone"
                sx={{ m: 1, width: '25ch' }}
                InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                }}
            />);
    }
}
export default i_telephone;