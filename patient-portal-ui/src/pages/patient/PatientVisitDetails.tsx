import * as React from 'react';
import { Typography, Container, Box } from "@mui/material";
import PatientSmartNav from "../../components/navBars/PatientSmartNav";
import HospitalID from '../../components/utility/patient/HospitalId';


import Grid from '@mui/material/Grid';

import { useTranslation } from "react-i18next";


function PatientVisitDetails(props: {
  setType: {
    id_user: number;
    name_user: string;
    r_opd_id: number;
    r_opd_date: string | null | undefined;
    r_opd_date_date: string | null | undefined;
    r_opd_date_hour: string | null | undefined;
    r_opd_dis_id_a_type_desc: string | null | undefined;
    r_opd_dis_id_a_desc: string | null | undefined;
    r_opd_note: string | null | undefined;
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
      <PatientSmartNav page={'PatientVisitDetails'} />
      <Grid sx={{ m: 1, width: 1, maxWidth: 500 }} container spacing={2}>
        <Grid xs={12}>
          <HospitalID id_user={props.setType.id_user} />
        </Grid>
        <Grid xs={12}>
          <Typography variant="body1" gutterBottom>
            {props.setType.name_user}
          </Typography>
        </Grid>
        <Grid xs={6}>
          <Typography style={{ fontWeight: 600 }}>
          {t("date")}
          </Typography>
          <Typography display="block" variant="button" gutterBottom>
            {props.setType.r_opd_date_date}
          </Typography>
        </Grid>
        <Grid xs={6}>
          <Typography style={{ fontWeight: 600 }}>
          {t("time")}
          </Typography>
          <Typography display="block" variant="button" gutterBottom>
            {props.setType.r_opd_date_hour}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Typography style={{ fontWeight: 600 }}>
          {t("category")}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {props.setType.r_opd_dis_id_a_type_desc}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Typography style={{ fontWeight: 600 }}>
          {t("diagnosis")}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {props.setType.r_opd_dis_id_a_desc}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Typography style={{ fontWeight: 600 }}>
          {t("note")}
          </Typography>
          <Box border={1} sx={{ width: '100%', maxWidth: 500 }}>
            <Typography sx={{ m: 1 }} variant="caption" gutterBottom>
              {props.setType.r_opd_note}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PatientVisitDetails;
