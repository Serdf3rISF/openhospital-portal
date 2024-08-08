import * as React from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { useTranslation } from "react-i18next";

const Bbowel = () => {
  const { t } = useTranslation('examination');
  let misure = {
    id: null,
    type: "bowel",
  }
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
     {t("bowel")}
    </Button>
  );
};

export default Bbowel;