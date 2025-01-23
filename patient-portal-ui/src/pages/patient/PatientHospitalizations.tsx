import React, { useState, useEffect } from 'react';
import { Button, Container, Box, Typography, MenuItem, FormControl, Select, SelectChangeEvent } from "@mui/material";
import PatientSmartNav from "../../components/navBars/PatientSmartNav";
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import ButtonGroup from '@mui/material/ButtonGroup';

import { getTimeLab, getDateLab } from '../../utils/ManageDate';
import { DefaultAllData } from '../../datajs/DefaultAllData'
import { useTranslation } from "react-i18next";
let btFilters: string[] = [];

interface Items {
  id?: string;
  id_user?: string;
  name_user?: string;
  r_id?: string;

  r_adm_wrd_id_a_desc: string;
  r_adm_admt_id_a_adm_desc: string;
  r_adm_date_adm_date: string;
  r_adm_date_adm_hour: string;
  r_adm_in_dis_id_a_desc: string;
  r_adm_out_dis_id_a_desc: string;
  r_adm_date_dis_date: string;
  r_adm_date_dis_hour: string;
  r_adm_note: string;
}
const PatientHospitalizations = () => {
  const {t} = useTranslation(["button_pp","label_pp"]);
  const columns = [
    { field: 'r_adm_date_adm', headerName: 'none', hide: true },
    { field: 'r_adm_id', headerName: 'none', hide: true },
    { field: 'r_adm_date_adm_date', headerName: t("date", { ns: 'label_pp' }), width: 100, headerClassName: 'super-app-theme--header', sortable: false, disableColumnMenu: true },
    { field: 'r_adm_date_adm_hour', headerName: t("hour", { ns: 'label_pp' }), width: 60, headerClassName: 'super-app-theme--header', sortable: false, disableColumnMenu: true },
    { field: 'r_adm_in_dis_id_a_desc', headerName:  t("diagnosis", { ns: 'label_pp' }), width: 140, headerClassName: 'super-app-theme--header', sortable: false, disableColumnMenu: true },
  ];
  let rows: Items[] = [];
 
  const [rowdata, setRowdata] = useState(rows);
  const [rowdataDef, setRowdataDef] = useState(rows);
  const [type, setType] = React.useState<string | undefined>("All");
  const [loadComponent, setLoadComponent] = useState(0);
  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };
  let rows_def: any[] = [];
  let navigate = useNavigate();


  useEffect(() => {
    let id_patient = localStorage.getItem("IdPatient");
    let type_code = "A";
    DefaultAllData.getHospitalEventByPatientIdByTypeCode(id_patient, type_code).then((res) => {

      res.forEach(function (k_a: any) {
        let k = JSON.parse(k_a.payload);
        // console.log(k);
        if (!btFilters.includes(k.ADM_IN_DIS_ID_A_DESC)) {
          btFilters.push(k.ADM_IN_DIS_ID_A_DESC);
        }
        rows_def.push({
          id: k.ADM_ID,
          id_user: k_a.patient.userId,
          name_user: k_a.patient.firstName + " " + k_a.patient.secondName,
          r_adm_id: k.ADM_ID,

          r_adm_wrd_id_a_desc: k.ADM_WRD_ID_A_DESC,
          r_adm_admt_id_a_adm_desc: k.ADM_ADMT_ID_A_ADM_DESC,
          r_adm_date_adm: k.ADM_DATE_ADM,
          r_adm_date_adm_date: getDateLab(k.ADM_DATE_ADM),
          r_adm_date_adm_hour: getTimeLab(k.ADM_DATE_ADM),
          r_adm_in_dis_id_a_desc: t(k.ADM_IN_DIS_ID_A_DESC),
          r_adm_out_dis_id_a_desc: k.ADM_OUT_DIS_ID_A_DESC,
          r_adm_date_dis_date: getDateLab(k.ADM_DATE_DIS),
          r_adm_date_dis_hour: getTimeLab(k.ADM_DATE_DIS),
          r_adm_note: k.ADM_NOTE,


        });
        //   console.log(Object.keys(k));
        //   [
        //     "ADM_ID",
        //     "ADM_IN",
        //     "ADM_TYPE",
        //     "ADM_WRD_ID_A",
        //     "ADM_YPROG",
        //     "ADM_PAT_ID",
        //     "ADM_DATE_ADM",
        //     "ADM_ADMT_ID_A_ADM",
        //     "ADM_FHU",
        //     "ADM_IN_DIS_ID_A",
        //     "ADM_OUT_DIS_ID_A",
        //     "ADM_OUT_DIS_ID_A_2",
        //     "ADM_OUT_DIS_ID_A_3",
        //     "ADM_DATE_DIS",
        //     "ADM_DIST_ID_A",
        //     "ADM_NOTE",
        //     "ADM_TRANS",
        //     "ADM_PRG_DATE_VIS",
        //     "ADM_PRG_PTT_ID_A",
        //     "ADM_PRG_DATE_DEL",
        //     "ADM_PRG_DLT_ID_A",
        //     "ADM_PRG_DRT_ID_A",
        //     "ADM_PRG_WEIGHT",
        //     "ADM_PRG_DATE_CTRL1",
        //     "ADM_PRG_DATE_CTRL2",
        //     "ADM_PRG_DATE_ABORT",
        //     "ADM_USR_ID_A",
        //     "ADM_LOCK",
        //     "ADM_DELETED",
        //     "ADM_CREATED_BY",
        //     "ADM_CREATED_DATE",
        //     "ADM_LAST_MODIFIED_BY",
        //     "ADM_LAST_MODIFIED_DATE",
        //     "ADM_ACTIVE",
        //     "ADM_WRD_ID_A_DESC",
        //     "ADM_ADMT_ID_A_ADM_DESC",
        //     "ADM_IN_DIS_ID_A_DESC",
        //     "ADM_OUT_DIS_ID_A_DESC",
        //     "ADM_OUT_DIS_ID_A_2_DESC",
        //     "ADM_OUT_DIS_ID_A_3_DESC",
        //     "ADM_DIST_ID_A_DESC"
        // ]
      });

      setRowdata(rows_def);
    });
  }, []);
  useEffect(() => {
    if (type != "All") {
      rows = rowdata.filter(function (el) {
        return el.r_adm_out_dis_id_a_desc == type
      });

      setRowdataDef(rows);
    } else {
      rows = rowdata;

      setRowdataDef(rows);
    }
    setLoadComponent(1);
  }, [rowdata, type]);


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
      <PatientSmartNav page={'PatientHospitalizations'} />

      {loadComponent ? <>
        <div style={{ width: '100%', height: '600px' }}>
          <Box
            sx={{
              overflowX: "scroll",
              width: 1,
              // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
            }}
          >
            <FormControl fullWidth>
              <Select
                labelId="option-select-label"
                id="option-select"
                value={type}
                onChange={handleChange}

              >
                <MenuItem value="All" >{t("all")}</MenuItem>
                {btFilters.map((bt_el) => (
                  <MenuItem key={bt_el} color="primary" value={bt_el}> <Typography noWrap>{t(bt_el)}</Typography> </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <ButtonGroup disableElevation className="button_group_f" sx={{ mt: 1, mb: 1, overflowX: "scroll", }} variant="outlined" aria-label="outlined button group">
              <Button variant={null === type ? 'contained' : 'outlined'} key="all" color="primary" onClick={() => setType(null)}>All</Button>
              {btFilters.map((bt_el) => (
                <Button variant={bt_el === type ? 'contained' : 'outlined'} key={bt_el} color="primary" onClick={() => { setType(bt_el); }}>{bt_el}</Button>
              ))}
            </ButtonGroup> */}
          </Box>
          <DataGrid
            sx={{
              border: 0,
              '&>.MuiDataGrid-main': {
                '&>.MuiDataGrid-columnHeaders': {
                  borderBottom: 'none',
                },
                '& div div div div >.MuiDataGrid-cell': {
                  borderBottom: 'none',
                },
              },
              "& .MuiDataGrid-virtualScrollerRenderZone": {
                "& .MuiDataGrid-row": {
                  width: "96%",
                  backgroundColor: "rgba(235, 235, 235, .9)",
                  margin: "0.3em",
                  borderRadius: 3
                }
              },
              '& .super-app-theme--header': {
                fontSize: '0.8em'
              },
            }}
            onCellClick={(params, event) => {
              if (!event.ctrlKey) {
                navigate("/PatientHospitalizationDetails", {
                  state: params.row,
                })
              }
            }}

            initialState={{
            }}
            columnVisibilityModel={{
              r_adm_date_adm: false,
              r_adm_id: false,
            }}
            sortModel={[{
              field: 'r_adm_date_adm',
              sort: 'desc',
            }]}
            rows={rowdataDef}
            columns={columns}
          />
        </div>
      </> : null}
    </Container>
  );
};

export default PatientHospitalizations;
