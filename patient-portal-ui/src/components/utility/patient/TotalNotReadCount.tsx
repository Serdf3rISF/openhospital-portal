import React, { useState, useEffect } from 'react';
import { Button, Typography, Container } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { DefaultAllData } from  '../../../datajs/DefaultAllData';
import { useTranslation } from "react-i18next";
function TotalNotReadCount(props: { id_user: number }) {
    const { t } = useTranslation('label_pp');
    // console.log(props);
    const theme = useTheme();
    const [dataUser, setDataUser] = useState([]);
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    useEffect(() => {
        DefaultAllData.getHospitalEventCountNotRead(props.id_user).then((resDataUser) => {
            setDataUser(resDataUser);
          });
    }, []);
    return (
        <Typography>
           {t("amount")} : {dataUser}
        </Typography>
    );
}

export default TotalNotReadCount;