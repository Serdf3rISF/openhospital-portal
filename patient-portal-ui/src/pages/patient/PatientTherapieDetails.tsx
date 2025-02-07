import * as React from 'react';
import { Typography, Container, Box } from "@mui/material";
import PatientSmartNav from "../../components/navBars/PatientSmartNav";

import Grid from '@mui/material/Grid';

import { useTranslation } from "react-i18next";


function PatientTherapieDetails(props: {
  setType: {
    date: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
    hour: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
    diagnosis: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
    value: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
    category: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
    note: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
  };
}) {
  const { t } = useTranslation('label_pp');
  return (
    <Container
      maxWidth="lg"
      sx={{

        display: "flex",
        alignItems: "center",
        flexDirection: "column",

      }}
    >
      <PatientSmartNav page={'PatientTherapieDetails'} />
      <Grid sx={{ m: 1, width: 1, maxWidth: 500 }} container spacing={2}>
        <Grid xs={6}>
          <Typography style={{ fontWeight: 600 }}>
          {t("date")}
          </Typography>
          <Typography display="block" variant="button" gutterBottom>
            {props.setType.date}
          </Typography>
        </Grid>
        <Grid xs={6}>
          <Typography style={{ fontWeight: 600 }}>
          {t("time")}
          </Typography>
          <Typography display="block" variant="button" gutterBottom>
            {props.setType.hour}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Typography style={{ fontWeight: 600 }}>
          {t("diagnosis")}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {props.setType.diagnosis}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Typography style={{ fontWeight: 600 }}>
          {t("category")}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
          {props.setType.value}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Typography style={{ fontWeight: 600 }}>
          {t("note")}
          </Typography>
          <Box border={1} sx={{ width: '100%', maxWidth: 500 }}>

            <Typography sx={{ m: 1 }} variant="caption" gutterBottom>
              {props.setType.note}
            </Typography>
          </Box>
        </Grid>
      </Grid>






    </Container>

  );

};

export default PatientTherapieDetails;
