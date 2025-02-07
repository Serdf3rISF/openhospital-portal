

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';


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

        <select onChange={handleLangChange} value={language}>
          <option value="it">IT</option>
          <option value="en">EN</option>
        </select>
    );
};

export default LangSwitcher;