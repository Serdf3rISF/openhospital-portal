import * as React from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { useTranslation } from "react-i18next";

const BdiuresisVol24h = () => {
  const { t } = useTranslation('examination');
  let misure = {
    id: null,
    type: "diuresis_vol_24h",
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
        {t("diuresisvolume24h")}
    </Button>
  );
};

export default BdiuresisVol24h;
