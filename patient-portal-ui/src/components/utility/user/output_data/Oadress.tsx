import React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from "react-i18next";

export default function Oadress(address: any) {
    const { t } = useTranslation('patient');
    return (
        <div>
            <Box>
                <Typography variant="body1" display="inline">{t("address")}:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', ml: 1 }} display="inline">{address.data}</Typography>
            </Box>
        </div>
    );
}
