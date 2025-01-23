import React, { Component } from "react";
import { Button, Typography, Container } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from "react-i18next";
function HospitalId(props: { id_user: number }) {
    // console.log(props);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const { t } = useTranslation('label_pp');
    return (
        <Typography>
             {t("hospital")} Id:   {localStorage.getItem("HospitalId")}
        </Typography>
    );
}

export default HospitalId;