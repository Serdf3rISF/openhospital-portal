
import React, { useState, useEffect } from 'react';
import { Button, Container, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PatientNav from "../../components/navBars/PatientNav";
import PatientSmartNav from "../../components/navBars/PatientSmartNav";
import DoctorSmartNav from "../../components/navBars/DoctorSmartNav";
import DefaultPatient from '../../datajs/DefaultPatient'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { DefaultAllData } from '../../datajs/DefaultAllData';
import { useTranslation } from "react-i18next";

const PatientHome = () => {
  const { t } = useTranslation('button_pp');
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  interface Items {
    firstName?: string;
    secondName?: string;
    birthDate?: string;
    sex?: string;
    address?: string;
    city?: string;
    telephone?: string;
  }
  interface datauser {
    datauser?: Items;
  }
  const [dataUser, setDataUser] = useState([]);
  const [idPatient, setIdPatient] = useState(0);
  const [loadComponent, setLoadComponent] = useState(0);
  const [typeVisualization, setTypeVisualization] = useState("");
  const [numO, setNumO] = useState(0);
  const [numE, setNumE] = useState(0);
  const [numA, setNumA] = useState(0);
  const [numT, setNumT] = useState(0);
  const [numV, setNumV] = useState(0);
  const btHomePatient = [
    {
      id: 1,
      label: t("measurements"),
      id_label: "measurements",
      to: '/PatientMeasurements',
      locked: false,
      order: 1,
    },
    {
      id: 2,
      label: t("visits"),
      id_label: "Visits",
      to: '/PatientVisits',
      locked: false,
      order: 2,
    },
    // {
    //   id: 3,
    //   label: "Ads/Deadliness",
    //   to: '/PatientAdsDeadlines',
    //   locked: true,
    //   order: 3,
    // },
    {
      id: 4,
      label: t("exams"),
      id_label: "Exams",
      to: '/PatientExams',
      locked: false,
      order: 4,
    },
    {
      id: 5,
      label: t("hospitalizations"),
      id_label: "Hospitalizations",
      to: '/PatientHospitalizations',
      locked: false,
      order: 5,
    },
    // {
    //   id: 6,
    //   label: "Payments",
    //   to: '/PatientPayments s',
    //   locked: true,
    //   order: 6,
    // },
    {
      id: 7,
      label: t("therapies"),
      id_label: "Therapies",
      to: '/PatientTherapies',
      locked: false,
      order: 7,
    },
    {
      id: 8,
      label: t("vaccinations"),
      id_label: "Vaccinations",
      to: '/PatientVaccinations',
      locked: false,
      order: 8,
    },
  ];
  // console.log(localStorage.getItem("IdPatient"));
  useEffect(() => {
    let id_patient = localStorage.getItem("IdPatient");
    let typeVisualization = localStorage.getItem("typeVisualization");

    DefaultAllData.getHospitalEventsByPatientId(id_patient).then((res) => {
      // console.log(res);
      res.forEach((item: { readDate: null; eventType: { code: any; }; }) => {
        if (item.readDate == null) {
          switch (item.eventType.code) {
            case 'O':
              setNumO(prevNumO => prevNumO + 1);
              break;
            case 'E':
              setNumE(prevNumE => prevNumE + 1);
              break;
            case 'A':
              setNumA(prevNumA => prevNumA + 1);
              break;
            case 'T':
              setNumT(prevNumT => prevNumT + 1);
              break;
            case 'V':
              setNumV(prevNumV => prevNumV + 1);
              break;
            default:
              break;
          }
        }
      });

    });
    DefaultAllData.getPatientsById(id_patient).then((res) => {
      setDataUser(res);
      setLoadComponent(1);
      if (typeVisualization == "doctor") {
        setTypeVisualization("doctor");
      } else { setTypeVisualization("patient"); }
    });
  }, []);

  return (

    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",

      }}
    >
      {matches ? <><p>Only Smart Phone</p></> : <>
        {loadComponent ? typeVisualization == "doctor" ? <> <DoctorSmartNav /> </> : <> <PatientNav {...dataUser} /></> : null}
        {/* {typeVisualization == "doctor" ? <> "dottore" </> : null} */}
        {typeVisualization == "patient" ? <>
          <Box sx={{ mt: 14, width: 1 }}>
            <PatientSmartNav page={'PatientHome'} />
          </Box>
        </> : <>
          <Box sx={{ mt: 0, width: 1 }}>
            <PatientSmartNav page={'PatientHome'} />
          </Box>
        </>}

        {

          btHomePatient.map((d, i) => (

            <Button key={d.id} component={Link} to={d.to} sx={{
              margin: '8px', minHeight: '56px', borderRadius: '15px', width: 1, mt: 1, display: 'flex',
              justifyContent: 'space-between'
            }} variant="contained" color="primary">
              <div style={{ textAlign: "left" }}>
                <Typography>
                  {d.label}
                </Typography>
              </div>
              <div style={{ textAlign: "right" }}>
                <Typography variant="h5">
                  {d.id_label != "Medasurements" ? "" : ""}
                  {d.id_label == "Visits" ? (numO > 0 ? numO : "-") : ""}
                  {d.id_label == "Exams" ? (numE > 0 ? numE : "-") : ""}
                  {d.id_label == "Hospitalizations" ? (numA > 0 ? numA : "-") : ""}
                  {d.id_label == "Therapies" ? (numT > 0 ? numT : "-") : ""}
                  {d.id_label == "Vaccinations" ? (numV > 0 ? numV : "-") : ""}
                </Typography>
              </div>
            </Button>
          ))
        }
      </>}

    </Container >
  );
};
export default PatientHome;
