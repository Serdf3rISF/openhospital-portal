// import React, { FunctionComponent, useContext } from "react";
// import i18n from "i18next";
// import { LangContext } from "../../../libraries/langContext/langContext";
// import "./styles.scss";
// import { useTranslation } from "react-i18next";
// import availableLanguages from "../../../customization/available-languages.json";
// import { isEmpty } from "lodash";

// const fallbackLanguages: Record<string, string> = {
//   en: "English",
//   it: "Italiano",
//   de: "Deutsch",
//   fr: "Français",
//   es: "Español",
//   pt: "Português",
//   ar: "عرب",
//   sw: "Svenska",
//   am: "አማርኛ",
//   cs: "čeština",
//   sq: "Shqiptar",
//   zh: "中国人",
// };

// const LangSwitcher: FunctionComponent = () => {
//   const currentLang = i18n.language;
//   const { changeLang } = useContext(LangContext);

//   const languages = isEmpty(availableLanguages.availableLanguages)
//     ? Object.keys(fallbackLanguages)
//     : availableLanguages.availableLanguages;

//   const renderOptions = (): JSX.Element[] => {
//     return languages.map((code: string) => (
//       <option key={code} value={code}>
//         {fallbackLanguages[code]}
//       </option>
//     ));
//   };

//   const getCurrentLang = () => {
//     var value = "";
//     languages.forEach((key: string) => {
//       if (currentLang === key || currentLang.split("-")[0] === key) {
//         value = key;
//       }
//     });
//     return value;
//   };

//   return (
//     <div className="langSwitcher">
//       <select
//         value={getCurrentLang()}
//         onChange={(e) => changeLang(e.target.value as string)}
//       >
//         {renderOptions()}
//       </select>
//     </div>
//   );
// };

// export default LangSwitcher;

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Flags from 'country-flag-icons/react/3x2'
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));


const LangSwitcher = () => {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState("id");

    const handleLangChange = (evt: { target: { value: any; }; }) => {
        const lang = evt.target.value;
        console.log(lang);
        setLanguage(lang);
        i18n.changeLanguage(lang);
    };
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (evt: { target: { value: any; }; }) => {
        const lang = evt.target.value;
        console.log(lang);
        setLanguage(lang);
        i18n.changeLanguage(lang);
        setAnchorEl(null);
    };
    return (
        // <div>
        //     <Button
        //         id="demo-customized-button"
        //         aria-controls={open ? 'demo-customized-menu' : undefined}
        //         aria-haspopup="true"
        //         aria-expanded={open ? 'true' : undefined}
        //         variant="contained"
        //         disableElevation
        //         onClick={handleClick}
        //         endIcon={<KeyboardArrowDownIcon />}
        //     >
        //         trad_ling
        //     </Button>
        //     <StyledMenu
        //         id="demo-customized-menu"
        //         MenuListProps={{
        //             'aria-labelledby': 'demo-customized-button',
        //         }}
        //         anchorEl={anchorEl}
        //         open={open}
        //         onClose={handleClose}
        //     >
        //         <MenuItem onClick={handleClose} disableRipple>
        //             <Flags.GB style={{ "width": "5%", margin: "0px 2px 0px 0px", }} title="United Kingdom" />
        //             EN
        //         </MenuItem>
        //         <MenuItem onClick={handleClose} disableRipple>
        //             <Flags.IT style={{ "width": "5%", margin: "0px 2px 0px 0px", }} title="Italy" />
        //             IT
        //         </MenuItem>
        //     </StyledMenu>
        // </div>

        <select onChange={handleLangChange} value={language}>
          <option value="it">IT</option>
          <option value="en">EN</option>
        </select>
    );
};

export default LangSwitcher;