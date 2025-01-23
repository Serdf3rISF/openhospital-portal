import React, { useState, useEffect } from 'react';
import { Button, Container, Box, Typography, MenuItem, FormControl, Select, SelectChangeEvent } from "@mui/material";

import PatientSmartNav from "../../components/navBars/PatientSmartNav";
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import ButtonGroup from '@mui/material/ButtonGroup';
import { useLocation } from 'react-router-dom';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

import { getTimeLab, getDateLab } from '../../utils/ManageDate';
import { DefaultAllData } from '../../datajs/DefaultAllData'
import { useTranslation } from "react-i18next";
let btFilters: string[] = [];

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
  r_filter?: string;
}


const PatientMeasurements = () => {
  const { t } = useTranslation(["button_pp", "label_pp"]);
  const columns = [
    { field: 'date_time', headerName: '', hide: true, sortable: false, disableColumnMenu: true },
    { field: 'r_id', headerName: '', hide: true, sortable: false, disableColumnMenu: true },
    { field: 'date', headerName: t("date", { ns: 'label_pp' }), width: 100, headerClassName: 'super-app-theme--header', sortable: false, disableColumnMenu: true },
    { field: 'hour', headerName: t("hour", { ns: 'label_pp' }), width: 60, headerClassName: 'super-app-theme--header', sortable: false, disableColumnMenu: true },
    { field: 'misure', headerName: t("misure", { ns: 'label_pp' }), width: 140, headerClassName: 'super-app-theme--header', sortable: false, disableColumnMenu: true }
  ];
  let rows: Items[] = [];
  const location = useLocation();
  const [loadSnackBar, setLoadSnackBar] = useState(false);
  const [messageSnackBar, setMessageSnackBar] = useState("Default message");
  const [rowdata, setRowdata] = useState(rows);
  const [rowdataDef, setRowdataDef] = useState(rows);
  const [type, setType] = React.useState<string | undefined>("All");
  const [loadComponent, setLoadComponent] = useState(0);
  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };
  let rows_def: any[] = [];
  let navigate = useNavigate();
  const handleCloseSnackbar = () => {
    setLoadSnackBar(false);
  };
  useEffect(() => {
    // console.log(location);
    if (location.state != null) {

      const data = location.state.res;
      let message = "";
      console.log(data.type);
      if (data.type == "Insert") {
        message += t("insert", { ns: 'label_pp' });
      }
      if (data.type == "Update") {
        message += t("update", { ns: 'label_pp' });
      }
      if (data.type == "Delete") {
        message += t("delete", { ns: 'label_pp' });
      }
      if (data.type == "Delete") {
        // message += " " + t("of", { ns: 'label_pp' }) +" " +  data.recordType.measurementType + " " + t("was", { ns: 'label_pp' }) + " " + t("successfull", { ns: 'label_pp' });
        message += " " + t("was", { ns: 'label_pp' }) + " " + t("successfull", { ns: 'label_pp' });
      } else {
        message += " " + t("value", { ns: 'label_pp' }) + " " + data.value1;
        if (data.value2 != -1) {
          message += t("and", { ns: 'label_pp' }) + " " + t("value", { ns: 'label_pp' }) + " " + data.value2;
        }
        // message += " " + t("of", { ns: 'label_pp' }) + " " + data.recordType.measurementType + " " + t("archived", { ns: 'label_pp' });
        message += " " + t("archived", { ns: 'label_pp' });
      }
      setLoadSnackBar(true);
      setMessageSnackBar(message);

    }
  }, []);


  useEffect(() => {
    let id_patient = localStorage.getItem("IdPatient");
    DefaultAllData.getPatientrecords_patient(id_patient).then((res) => {
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
          misure: t(k.recordType.measurementType),
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
          r_id: k.id,
          date_time: k.recordDate,
          r_filter: k.recordType.measurementType,
        });
        //   console.log(Object.keys(k));
        //   [
        //     "id",
        //     "recordDate",
        //     "patient",
        //     "recordType",
        //     "value1",
        //     "value2",
        //     "optionValue",
        //     "note",
        //     "created"
        // ]
      });
      setRowdata(rows_def);
    });
  }, []);

  useEffect(() => {
    if (type != "All") {

      rows = rowdata.filter(function (el) {
        console.log(el);
        return el.r_filter == type
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
      <Snackbar

        anchorOrigin={{ "vertical": "bottom", "horizontal": "center" }}
        open={loadSnackBar}
        autoHideDuration={88000}
        TransitionComponent={Slide}
        onClose={handleCloseSnackbar}
        message={messageSnackBar}

      // action={action}
      />


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
            <FormControl fullWidth>
              <Select
                labelId="option-select-label"
                id="option-select"
                value={type}
                onChange={handleChange}

              >
                <MenuItem value="All" >{t("all")}</MenuItem>
                {btFilters.map((bt_el) => (
                  <MenuItem key={bt_el} color="primary" value={bt_el}> <Typography noWrap> {t(bt_el)}</Typography> </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <ButtonGroup disableElevation className="button_group_f" sx={{ mt: 1, mb: 1, overflowX: "scroll", }} variant="outlined" aria-label="outlined button group">
              <Button variant={null === type ? 'contained' : 'outlined'} key="all" color="primary" onClick={() => setType(null)}>{t("all")}</Button>
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
                navigate("/PatientInsertMeasurements", {
                  state: params.row,
                })
              }
            }}

            initialState={{
            }}
            columnVisibilityModel={{
              date_time: false,
              r_id: false,
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

export default PatientMeasurements;
