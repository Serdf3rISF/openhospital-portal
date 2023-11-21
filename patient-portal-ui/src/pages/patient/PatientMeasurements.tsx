import React, { useState, useEffect } from 'react';
import { Button, Container, Box } from "@mui/material";
import PatientSmartNav from "../../components/navBars/PatientSmartNav";
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import ButtonGroup from '@mui/material/ButtonGroup';
import Misure from '../../datajs/Misure'

import { getTimeLab, getDateLab, compare, getDayName } from '../../utils/ManageDate';
import { DeafutlAllData } from '../../datajs/DeafutlAllData'

let btFilters: string[] = [];
const values = Misure;
interface Items {
  id?: string;
  id_measure?: string;
  date_complete?: string;
  date?: string;
  hour?: string;
  value?: string;
  misure?: string;
  type?: string;
  code?: string;
  defaultOptionValue?: string | null;
  defaultValue1?: number;
  defaultValue2?: number;
  maxValue: number | string;
  measurementType?: string;
  measurementValueType?: string;
  minValue: number | string;
  uom?: string;
}
const columns = [
  { field: 'date_complete', headerName: 'vv', hide: true },
  { field: 'date', headerName: 'Data', width: 92, headerClassName: 'super-app-theme--header', sortable: false, disableColumnMenu: true },
  { field: 'hour', headerName: 'Hour', width: 56, headerClassName: 'super-app-theme--header', sortable: false, disableColumnMenu: true },
  { field: 'misure', headerName: 'Misure', width: 160, headerClassName: 'super-app-theme--header', sortable: false, disableColumnMenu: true },
  // { field: 'id', headerName: 'ID', width: 0, hide: true, headerClassName: 'super-app-theme--header', sortable: false, disableColumnMenu: true },
  // { field: 'id_measure', headerName: 'Id_measure', width: 0, hide: true, headerClassName: 'super-app-theme--header', sortable: false, disableColumnMenu: true },
  // { field: 'value', headerName: 'Value', width: 100, headerClassName: 'super-app-theme--header', sortable: false, disableColumnMenu: true },
  // { field: 'type', headerName: 'Type', width: 180, hide: true, headerClassName: 'super-app-theme--header', sortable: false, disableColumnMenu: true },
  // { field: 'type', headerName: 'Type', width: 180, hide: true, headerClassName: 'super-app-theme--header', sortable: false, disableColumnMenu: true },
  // { field: 'type', headerName: 'Type', width: 180, hide: true, headerClassName: 'super-app-theme--header', sortable: false, disableColumnMenu: true },
  // { field: 'type', headerName: 'Type', width: 180, hide: true, headerClassName: 'super-app-theme--header', sortable: false, disableColumnMenu: true },
];

const PatientMeasurements = () => {
  let rows: Items[] = [];
  const [rowdata, setRowdata] = useState(rows);
  const [rowdataDef, setRowdataDef] = useState(rows);
  const [type, setType] = React.useState<string | null>(null);
  const [loadComponent, setLoadComponent] = useState(0);
  let rows_def: any[] = [];
  useEffect(() => {
    let id_patient = localStorage.getItem("IdPatient");


    // DeafutlAllData.getPatientrecords_All_measurement(id_patient, type_mis).then((res) => {
    DeafutlAllData.getPatientrecords_patient(id_patient).then((res) => {

      res.forEach(function (k: any) {
        if (!btFilters.includes(k.recordType.measurementType)) {
          btFilters.push(k.recordType.measurementType);
        }
        rows_def.push({
          id: k.id,
          id_measure: k.id,
          date_complete: k.recordDate,
          date: getDateLab(k.recordDate),
          hour: getTimeLab(k.recordDate),
          value: k.value1,
          misure: k.recordType.measurementType,
          type: k.recordType.measurementType.toLowerCase(),
          code: k.recordType.code,
          defaultOptionValue: k.recordType.defaultOptionValue,
          defaultValue1: k.value1,// ---set the Default Value
          defaultValue2: k.recordType.defaultValue2,
          maxValue: k.recordType.maxValue,
          measurementType: k.recordType.measurementType,
          measurementValueType: k.recordType.measurementValueType,
          minValue: k.recordType.minValue,
          uom: k.recordType.uom,
        });
      });

      setRowdata(rows_def);
    });
  }, []);
  useEffect(() => {
    if (type != null) {
      rows = rowdata.filter(function (el) {
        return el.misure == type
      });

      setRowdataDef(rows);
    } else {
      rows = rowdata;

      setRowdataDef(rows);
    }
    setLoadComponent(1);
  }, [rowdata, type]);

  let navigate = useNavigate();
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

      <PatientSmartNav page={'PatientMeasurements'} />
      {loadComponent ? <>
        <div style={{ width: '100%', height: '600px' }}>
          <Box
            sx={{
              overflowX: "scroll",
              width: 1,
              // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
            }}
          >
            <ButtonGroup sx={{ mt: 1, mb: 1, overflowX: "scroll", }} variant="outlined" aria-label="outlined button group">
              <Button key="all" color="primary" onClick={() => setType(null)}>All</Button>
              {btFilters.map((bt_el) => (
                <Button key={bt_el} color="primary" onClick={() => setType(bt_el)}>{bt_el}</Button>
              ))}
            </ButtonGroup>
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
                navigate("/PatientInsertMeasurements", {
                  state: params.row,
                })
              }
            }}

            initialState={{

            }}
            columnVisibilityModel={{
              date_complete: false,
            }}
            sortModel={[{
              field: 'date_complete',
              sort: 'asc',
            }]}
            rows={rowdataDef}
            columns={columns}
          />
        </div>
      </> : null}
    </Container>
  );

};

export default PatientMeasurements;
