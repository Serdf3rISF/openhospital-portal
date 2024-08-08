import * as React from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Bweight = () => {
  const { t } = useTranslation('examination');
  let misure = {
    id: null,
    type: "weight",
  }
  const [data, setData] = useState({ id: "1t4", title: " How to pass state in react-router-dom", tag: ["reactjs", "react-router-dom"] });
  return (
    <Button variant="outlined" component={Link} to={{
      pathname: '/PatientInsertMeasurements',

    }}
      state={misure}
      fullWidth
      sx={{
        height: "6em",
      }}
      color="primary"
      aria-label="insert"
      size="large">
       {t("weight")}
    </Button>
  );
};


export default Bweight;