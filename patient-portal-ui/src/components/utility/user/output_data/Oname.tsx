import React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from "react-i18next";

export default function Oname(data: any) {
   const { t } = useTranslation('patient');
   return (
      <div>
         <Box>
            <Typography color="primary" variant="body1" display="inline">{t("firstname")}:</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', ml: 1 }} display="inline">{data.firstName}</Typography>
         </Box>
         <Box>
            <Typography variant="body1" display="inline">{t("secondname")}:</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', ml: 1 }} display="inline">{data.secondName}</Typography>
         </Box>
      </div >
   );
}