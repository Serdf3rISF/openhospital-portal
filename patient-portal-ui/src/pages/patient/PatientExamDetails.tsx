import * as React from 'react';
import { Typography, Container, Box } from "@mui/material";
import PatientSmartNav from "../../components/navBars/PatientSmartNav";
import HospitalID from '../../components/utility/patient/HospitalId';

import Grid from '@mui/material/Grid';



function PatientExamDetails(props: {

  setType: {
    id_user: number;
    name_user: string | null | undefined;
    r_lab_id: number;
    r_lab_date_date: string | null | undefined;
    r_lab_date_hour: string | null | undefined;
    r_exc_desc: string | null | undefined;
    r_lab_status: string | null | undefined;
    r_exa_desc: string | null | undefined;
    r_lab_res: string | null | undefined;
    r_lab_last_modified_date_date: string | null | undefined;
    r_lab_last_modified_date_time: string | null | undefined;
    r_labr_desc: string | null | undefined;
    r_lab_note: string | null | undefined;
  };
}) {
  console.log(props);
  return (
    <Container
      maxWidth="lg"
      sx={{

        display: "flex",
        alignItems: "center",
        flexDirection: "column",

      }}
    >
      <PatientSmartNav page={'PatientExamDetails'} />
      <Grid sx={{ m: 1, width: 1, maxWidth: 500 }} container spacing={2}>
        <Grid xs={12}>
          <Typography style={{ fontWeight: 600 }}>
            <HospitalID id_user={props.setType.id_user} />
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Typography variant="body1" gutterBottom>
            {props.setType.name_user}
          </Typography>
        </Grid>
        <Grid xs={6}>
          <Typography style={{ fontWeight: 600 }}>
            Date
          </Typography>
          <Typography display="block" variant="button" gutterBottom>
            {props.setType.r_lab_date_date}
          </Typography>
        </Grid>
        <Grid xs={6}>
          <Typography style={{ fontWeight: 600 }}>
            Time
          </Typography>
          <Typography display="block" variant="button" gutterBottom>
            {props.setType.r_lab_date_hour}
          </Typography>
        </Grid>
        <Grid xs={6}>
          <Typography style={{ fontWeight: 600 }}>
            Categoria Esame
          </Typography>
          <Typography display="block" variant="button" gutterBottom>
            {props.setType.r_exc_desc}
          </Typography>
        </Grid>
        <Grid xs={6}>
          <Typography style={{ fontWeight: 600 }}>
            Stato
          </Typography>
          <Typography display="block" variant="button" gutterBottom>
            {props.setType.r_lab_status}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Typography style={{ fontWeight: 600 }}>
            Esame
          </Typography>
          <Typography variant="body1" gutterBottom>
            {props.setType.r_exa_desc}
          </Typography>
        </Grid>
        <Grid xs={6}>
          <Typography style={{ fontWeight: 600 }}>
            Esito
          </Typography>
          <Typography display="block" variant="button" gutterBottom>
            {props.setType.r_lab_res}
          </Typography>
        </Grid>
        <Grid xs={6}>
          <Typography style={{ fontWeight: 600 }}>
            Data/orario - Esito
          </Typography>
          <Typography display="block" variant="button" gutterBottom>
            {props.setType.r_lab_last_modified_date_date}
          </Typography>
          <Typography display="block" variant="button" gutterBottom>
            {props.setType.r_lab_last_modified_date_time}
          </Typography>
        </Grid>
        {props.setType.r_labr_desc ? <>
          <Grid xs={12}>
            <Typography style={{ fontWeight: 600 }}>
              Risultati multipli
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.setType.r_labr_desc}
            </Typography>
          </Grid>
        </> : <>
        </>}
        <Grid xs={12}>
          <Typography style={{ fontWeight: 600 }}>
            Note
          </Typography>
          <Box border={1} sx={{ width: '100%', maxWidth: 500 }}>
            <Typography sx={{ m: 1 }} variant="caption" gutterBottom>
              {props.setType.r_lab_note}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container >
  );

};
export default PatientExamDetails;
