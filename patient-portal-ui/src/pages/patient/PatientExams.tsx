import React, { useState, useEffect } from 'react';
import { Button, Container, Box, Typography, MenuItem, FormControl, Select, SelectChangeEvent } from "@mui/material";
import PatientSmartNav from "../../components/navBars/PatientSmartNav";
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import ButtonGroup from '@mui/material/ButtonGroup';

import { getTimeLab, getDateLab } from '../../utils/ManageDate';
import { DefaultAllData } from '../../datajs/DefaultAllData'

let btFilters: string[] = [];
const columns = [
  { field: 'r_lab_date', headerName: 'none', hide: true },
  { field: 'r_lab_id', headerName: 'none', hide: true },
  { field: 'r_lab_date_date', headerName: 'Data', width: 100, headerClassName: 'super-app-theme--header', sortable: false, disableColumnMenu: true },
  { field: 'r_lab_date_hour', headerName: 'Hour', width: 60, headerClassName: 'super-app-theme--header', sortable: false, disableColumnMenu: true },
  { field: 'r_exa_desc', headerName: 'Exam', width: 140, headerClassName: 'super-app-theme--header', sortable: false, disableColumnMenu: true },
];
interface Items {
  r_lab_id?: string;
  r_lab_date?: string;
  r_lab_date_date?: string;
  r_lab_date_hour?: string;
  r_exa_desc?: string;
}
const PatientExams = () => {
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
    let type_code = "E";
    DefaultAllData.getHospitalEventByPatientIdByTypeCode(id_patient, type_code).then((res) => {
     
      res.forEach(function (k_a: any) {
        let k = JSON.parse(k_a.payload);
        let g_exc_desc = "";
        let g_exa_desc = "";
        let g_lab_res = "";
        if (k.LAB_EXA != undefined) {
          g_exc_desc = k.LAB_EXA.EXA_TYPE.EXC_DESC;
          g_exa_desc = k.LAB_EXA.EXA_DESC;
        } else {
          g_exc_desc = k.LAB_EXA_ID_A.EXA_ID_A.EXC_DESC;
          g_exa_desc = k.LAB_EXA_ID_A.EXA_DESC;
        }
        if (k.LAB_MULTIPLE_RES != undefined) {
          k.LAB_MULTIPLE_RES.forEach(function (k_lr: any) {
            g_lab_res += k_lr.LABR_DESC + ",";
          });
          g_lab_res =g_lab_res.slice(0, -1)
        } else {
          g_lab_res = "";
        }
        if (!btFilters.includes(g_exa_desc)) {
          btFilters.push(g_exa_desc);
        }
        rows_def.push({
          id: k.LAB_ID,
          id_user: k_a.patient.userId,
          name_user: k_a.patient.firstName + " " + k_a.patient.secondName,
          r_lab_id: k.LAB_ID,
          r_lab_date: k.LAB_DATE,
          r_lab_date_date: getDateLab(k.LAB_DATE),
          r_lab_date_hour: getTimeLab(k.LAB_DATE),
          r_exc_desc: g_exc_desc,
          r_lab_status: k.LAB_STATUS,
          r_exa_desc: g_exa_desc,
          r_lab_res: k.LAB_RES,
          r_lab_last_modified_date_date: getDateLab(k.LAB_LAST_MODIFIED_DATE),
          r_lab_last_modified_date_time: getTimeLab(k.LAB_LAST_MODIFIED_DATE),
          r_labr_desc: g_lab_res,
          r_lab_note: k.LAB_NOTE,
        });
      });


      setRowdata(rows_def);
    });

  }, []);
  useEffect(() => {
    if (type != "All") {
      rows = rowdata.filter(function (el) {
        return el.r_exa_desc == type
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
      <PatientSmartNav page={'PatientExams'} />
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
                navigate("/PatientExamDetails", {
                  state: params.row,
                })
              }
            }}


            initialState={{
            }}
            columnVisibilityModel={{
              r_lab_id: false,
              r_lab_date: false,
            }}
            sortModel={[{
              field: 'date_time',
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
export default PatientExams;
