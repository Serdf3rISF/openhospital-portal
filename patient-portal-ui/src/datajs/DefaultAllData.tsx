import React, { useState, useEffect } from "react";
import { dateIsoToString, stringToDate } from '../utils/ManageDate';
const url_0 = 'http://api-develop.ohpp.local:18080/api/';
export const DefaultAllData = {


  // --- ADMIN_API
  getAllUsers: async function () {
    try {
      let response = await fetch(url_0 + 'api/admin/users');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  },
  // --- AUTH_API
  getToken: async function () {
    try {
      let response = await fetch(url_0 + 'api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "password": "admin",
          "username": "admin@patientportal.isf.org"
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  },
  postLogin: async function (user: any, pass: any) {
    try {
      let response = await fetch(url_0 + 'auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "password": pass,
          "username": user
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  },
  postLogout: async function (user: any, pass: any) {
    try {
      let response = await fetch(url_0 + 'auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "displayName": "string",
          "patientId": 0,
          "roles": [
            "string"
          ],
          "token": "string",
          "userId": 0,
          "username": "string"
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  },
  // --- PUBLIC_API
  getPatients: async function () {
    try {
      let response = await fetch(url_0 + 'public/patients');
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  },
  getHospitalevents: async function () {
    try {
      let response = await fetch(url_0 + 'public/hospitalevents');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  },
  getPatientrecords: async function () {
    try {
      let response = await fetch(url_0 + 'public/patientrecords');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  },
  getPatientrecords_patient: async function (id_patient: any) {
    try {
      let response = await fetch(url_0 + 'public/patientrecords/patient/' + id_patient);
      const data = await response.json();
      let sort_data = data.sort((a: any, b: any) => stringToDate(b.recordDate).valueOf() - stringToDate(a.recordDate).valueOf());
      return sort_data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  },
  getPatientrecords_measurement: async function () {
    try {
      let response = await fetch(url_0 + 'public/patientrecords/measurement/1?measurementType=DIURESIS');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  },
  getPatientrecords_All_measurement: async function (id_patient: any, type_code: any) {
    try {
      let arr_v = ["AUSCULTATION", "BLOOD_PRESSURE", "BOWEL", "DIURESIS", "DIURESIS_VOL", "HEIGHT", "HGT", "HR", "RR", "SATURATION", "TEMPERATURE", "WEIGHT"];

      let response = await fetch(url_0 + 'public/patientrecords/measurement/' + id_patient + '?measurementType=' + type_code);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  },
  getPatientrecordsAllMeasurementById: async function (id_patient: any) {
    try {

      let response = await fetch(url_0 + 'public/patientrecords/' + id_patient);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  },
  getPatientsById: async function (id_patient: any) {
    try {
      let response = await fetch(url_0 + 'public/patients/' + id_patient);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  },
  getHospitalEventsByPatientId: async function (id_patient: any) {
    try {
      let response = await fetch(url_0 + 'public/hospitalevents/patient/' + id_patient);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  },
  getHospitalEventByPatientIdByTypeCode: async function (id_patient: any, type_code: any) {
    try {
      let response = await fetch(url_0 + 'public/hospitalevents/eventType/' + id_patient + '?eventTypeCode=' + type_code);
      const data = await response.json();
      let sort_data = data.sort((a: any, b: any) => stringToDate(b.recordDate).valueOf() - stringToDate(a.recordDate).valueOf());
      return sort_data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  },
  // getHospitalEventByPatientId: async function (id_patient: any) {
  //   let response = await fetch(url_0 + 'public/hospitalevents/eventType/' + id_patient );
  //   const data = await response.json();
  //   // let sort_data = data.sort((a: any, b: any) => stringToDate(b.recordDate).valueOf() - stringToDate(a.recordDate).valueOf());
  //   console.log("AAA");
  //   console.log(data);
  //   return data;
  // },
  getRecordTypes: async function () {
    try {
      let response = await fetch(url_0 + 'public/recordtypes');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  },
  getEventTypes: async function () {

  },
  getAuscultationoptions: async function () {
    try {
      let response = await fetch(url_0 + 'public/recordtypes/auscultationoptions');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  },
  getBoweloptions: async function () {
    try {
      let response = await fetch(url_0 + 'public/recordtypes/boweloptions');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  },
  getDiuresisoptions: async function () {
    try {
      let response = await fetch(url_0 + 'public/recordtypes/diuresisoptions');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  },
  postInsertMeasurement: async function (patientId: any, value1: number, value2: number, recordDate: any, recordTypeCode: any) {
    try {
      let response = await fetch(url_0 + 'public/patientrecords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "note": null,
          "optionValue": null,
          "patientId": patientId,
          "recordDate": dateIsoToString(recordDate),
          "recordTypeCode": recordTypeCode,
          "value1": value1,
          "value2": value2
        }),
      });
      const data = await response.json();
      data.type = "Insert";
      return data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  },
  deleteMeasurement: async function (id_measure: number, measurementType: string) {
    try {
      let response = await fetch(url_0 + 'public/patientrecords/' + id_measure, {
        method: 'DELETE',
      });
      if (response.status === 204) {
        // DELETE avvenuta con successo
        const data = {
          type: "",
          value1: id_measure, value2: -1, recordType: {
            measurementType: measurementType
          }
        };
        data.type = "Delete";
        return data;
      } else if (response.status === 404) {
        // gestisci record non trovato
      } else {
        // altri codici di errore
      }
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }

  },
  postUpdateMeasurement: async function (patientId: any, value1: number, recordDate: any, recordTypeCode: any, res_all: any) {
    res_all.value1 = value1;
    try {
      let response = await fetch(url_0 + 'public/patientrecords/' + res_all.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          res_all),

      });
      const data = await response.json();
      data.type = "Update";
      return data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  },
  postUpdateMeasurementArterialPressure: async function (patientId: any, value1: number, value2: number, recordDate: any, recordTypeCode: any, res_all: any) {
    res_all.value1 = value1;
    res_all.value2 = value2;
    try {
      let response = await fetch(url_0 + 'public/patientrecords/' + res_all.id, {
        method: 'PUT',
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(
          res_all),

      });
      const data = await response.json();
      data.type = "Update";
      return data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  },
  getMeasurementbyId: async function (ins_upd: any) {
    try {
      let response = await fetch(url_0 + 'public/patientrecords/' + ins_upd);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }

  },
  getHospitalEventType: async function (id_patient: any) {
    let response = await fetch(url_0 + 'public/hospitalevents/patient/' + id_patient);
    const data = await response.json();
    return data;

  },
  getHospitalEventCountNotRead: async function (id_patient: any) {
    try {
      let response = await fetch(url_0 + 'public/hospitalevents/count/read/' + id_patient);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Si è verificato un errore:', error);
      // Puoi gestire l'errore in modo specifico qui, ad esempio:
      // - Restituire un valore di default
      // - Lanciare nuovamente l'errore
      // - Mostrare un messaggio all'utente
      throw error; // Rilancia l'errore per gestirlo a un livello superiore se necessario
    }
  },




}