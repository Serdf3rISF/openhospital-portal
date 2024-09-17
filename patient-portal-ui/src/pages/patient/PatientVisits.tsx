import React, { useState, useEffect } from 'react';
import { Button, Container, Box, Typography, MenuItem, FormControl, Select, SelectChangeEvent } from "@mui/material";

import PatientSmartNav from "../../components/navBars/PatientSmartNav";
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import ButtonGroup from '@mui/material/ButtonGroup';

import { getTimeLab, getDateLab, compare } from '../../utils/ManageDate';
import { DefaultAllData } from '../../datajs/DefaultAllData';

let btFilters: string[] = [];
const columns = [
  { field: 'r_opd_date', headerName: 'none', hide: true },
  { field: 'r_opd_id', headerName: 'none', hide: true },
  { field: 'r_opd_date_date', headerName: 'Data', width: 92, headerClassName: 'super-app-theme--header', sortable: false, disableColumnMenu: true },
  { field: 'r_opd_date_hour', headerName: 'Hour', width: 56, headerClassName: 'super-app-theme--header', sortable: false, disableColumnMenu: true },
  { field: 'r_opd_dis_id_a_desc', headerName: 'Diagnosis', width: 160, headerClassName: 'super-app-theme--header', sortable: false, disableColumnMenu: true },
];


interface Items {
  r_opd_id?: string;
  r_opd_date?: string;
  r_opd_date_date?: string;
  r_opd_date_hour?: string;
  r_opd_dis_id_a_desc?: string;
}


const PatientVisit = () => {
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
    let type_code = "O";
    DefaultAllData.getHospitalEventByPatientIdByTypeCode(id_patient, type_code).then((res) => {
      res.forEach(function (k_a: any) {
        let k = JSON.parse(k_a.payload);
        if (!btFilters.includes(k.OPD_DIS_ID_A_DESC)) {
          btFilters.push(k.OPD_DIS_ID_A_DESC);
        }

        rows_def.push({
          id: k.OPD_ID,
          id_user: k_a.patient.userId,
          name_user: k_a.patient.firstName + " " + k_a.patient.secondName,
          r_opd_id: k.OPD_ID,
          r_opd_date: k.OPD_DATE,
          r_opd_date_date: getDateLab(k.OPD_DATE),
          r_opd_date_hour: getTimeLab(k.OPD_DATE),
          r_opd_dis_id_a_type_desc: k.OPD_DIS_ID_A_TYPE_DESC,
          r_opd_dis_id_a_desc: k.OPD_DIS_ID_A_DESC,
          r_opd_note: k.OPD_NOTE,
        });
      });


      setRowdata(rows_def);
    });

  }, []);
  useEffect(() => {
    if (type != "All") {
      rows = rowdata.filter(function (el) {
        return el.r_opd_dis_id_a_desc == type
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
      <PatientSmartNav page={'PatientVisit'} />
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
                <MenuItem value="All" >All</MenuItem>
                {btFilters.map((bt_el) => (
                  <MenuItem key={bt_el} color="primary" value={bt_el}> <Typography noWrap>{bt_el}</Typography> </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <ButtonGroup disableElevation className="button_group_f" sx={{ mt: 1, mb: 1, overflowX: "scroll", }} variant="outlined" aria-label="outlined button group">
              <Button variant="contained" key="all" color="primary" onClick={() => setType(null)}>All</Button>
              {btFilters.map((bt_el) => (
                <Button key={bt_el} color="primary" title={bt_el} onClick={() => setType(bt_el)}> <Typography noWrap>{bt_el}</Typography> </Button>
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
                navigate("/PatientVisitDetails", {
                  state: params.row,
                })
              }
            }}
            initialState={{
            }}
            columnVisibilityModel={{
              r_opd_id: false,
              r_opd_date: false,
            }}
            sortModel={[{
              field: 'r_opd_date',
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

export default PatientVisit;


