import React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from "react-i18next";

export default function Osex(sex: any) {
   const { t } = useTranslation('patient');
   return (
      <div >
         <Box>
            <Typography variant="body1" display="inline">{t("sex")}:</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', ml: 1 }} display="inline">{sex.data}</Typography>
         </Box>
      </div>
   );
}
