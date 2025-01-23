import { useTranslation } from "react-i18next";

// const { t } = useTranslation('button_pp');
export const DefaultPatient = () => {
  const { t } = useTranslation('button_pp');
  const btHomePatient = [
    {
      id: 1,
      label: "dddd",
      id_label: "Measuremendddts",
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
  return btHomePatient;
}
export default DefaultPatient;