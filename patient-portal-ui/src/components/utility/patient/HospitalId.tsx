import React, { Component } from "react";
import { Button, Typography, Container } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
function HospitalId(props: { id_user: number }) {
    console.log(props);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Typography>
            Hospital Id:   {localStorage.getItem("HospitalId")}
        </Typography>
    );
}

export default HospitalId;