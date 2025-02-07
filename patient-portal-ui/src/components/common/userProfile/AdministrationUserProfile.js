import * as React from 'react';
// --- mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Typography, } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Chip from '@mui/material/Chip';

import Oname from "../../utility/user/output_data/Oname";
import Oage from "../../utility/user/output_data/Oage";
import Osex from "../../utility/user/output_data/Osex";
import Oadress from "../../utility/user/output_data/Oadress";
import Otelephone from "../../utility/user/output_data/Otelephone";

import ChangePassword from "../buttons/ChangePassword";
import ManageProfile from "../buttons/ManageProfile";
import Logout from "../buttons/Logout";

import IT from 'country-flag-icons/react/3x2/IT'

export default function AdministrationUserProfile() {
  const [open, setOpen] = React.useState(false);

  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    // console.log(anchor);
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ maxHeight: "90%", width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{ p: 1 }}>
        <Stack direction="row" spacing={2}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/administrator.jpeg" />
          <Oname />
        </Stack>
        <Divider />
        <Oadress />
        <Otelephone />
      </List>
      <List alignItems="center" sx={{ m: 1 }}>
        <Divider />
        <ChangePassword />
        <ManageProfile />
        <Divider />
        <Logout />
      </List>
    </Box>
  );
  return (
    <div style={{ "width": "95%" }} >
      {['top'].map((anchor) => (
        <React.Fragment key={anchor} >
          <Box borderRadius={4} sx={{
            p: 1,
            m: 1,
            mt: 2,
            width: 1,
            backgroundColor: 'primary.dark',
          }}>
            <Stack direction="row" spacing={2} sx={{
              width: 1,
            }}>
              <div style={{ "width": "20%" }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/administrator.jpeg" />
              </div>
              <div style={{ "width": "60%" }}>
                <Typography variant="h6">
                  Administration
                </Typography>
                <Typography variant="button" >
                  Mario Rossi
                </Typography>
              </div>
              <div style={{ "width": "20%" }}>lang
                <IT title="United States" sx={{
                  p: 2,
                  m: 1,
                  width: 1,
                }} />
              </div>
            </Stack>
          </Box>
          <Button endIcon={<ArrowDropDownIcon />} color="inherit" sx={{ width: 1 }} onClick={toggleDrawer(anchor, true)}>Personal Data</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}