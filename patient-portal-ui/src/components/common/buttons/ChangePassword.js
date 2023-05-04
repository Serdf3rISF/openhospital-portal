import * as React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import KeyIcon from '@mui/icons-material/Key';

const ChangePassword = ({ setAuth }) => {
  return (
    <Button disabled startIcon={<KeyIcon />} component={Link} to="/PatientHome"
      sx={{ width: 1, mt: 1 }} style={{ justifyContent: "flex-start" }} variant="contained" color="primary">
      Change Password
    </Button>
  );
};

export default ChangePassword;