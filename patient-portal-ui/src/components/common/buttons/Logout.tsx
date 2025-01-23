import * as React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useTranslation } from "react-i18next";
export default function Logout() {
  const { t } = useTranslation('button_pp');
  return (
    <Button startIcon={<ExitToAppIcon />} component={Link} to="/logout"
      sx={{ mt: 1 }}
      variant="outlined" color="primary">
        {t("log_out")} 
    </Button>
  );
};