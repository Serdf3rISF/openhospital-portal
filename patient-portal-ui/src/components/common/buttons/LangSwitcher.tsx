import * as React from 'react';
import { useState, useEffect } from 'react';
import { Select as BaseSelect, SelectProps, selectClasses, SelectRootSlotProps, } from '@mui/base/Select';

import { Option as BaseOption, optionClasses } from '@mui/base/Option';
import { styled } from '@mui/system';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import { useTranslation } from "react-i18next";
import Box from '@mui/material/Box';

function LangSwitcher() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("id");
  const [country_def_label, setCountry_def_label] = useState("");
  const [country_def_code, setCountry_def_code] = useState("");

  const handleLangChange = (value: any) => {
    setCountry_def_code(value.toLowerCase());
    localStorage.setItem("lang", value.toLowerCase());
    if (value == "GB") { value = "en" }
    setLanguage(value.toLowerCase());
    setCountry_def_label("flag");
    i18n.changeLanguage(value.toLowerCase());
  };
  // --- Remember the language in local storage
  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang) {
      setCountry_def_code(storedLang);
      let redstoredLang = "";
      if (redstoredLang == "en") { redstoredLang = "GB" }
      setLanguage(redstoredLang);
      setCountry_def_label("flag");
    }
  }, []);

  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = (evt: { target: { value: any; }; }) => {
  //   const lang = evt.target.value;
  //   setLanguage(lang);
  //   i18n.changeLanguage(lang);
  //   setAnchorEl(null);
  // };
  return (
    <Box>
      {(country_def_code && country_def_code !== 'null') ? (
        <img
          loading="lazy"
          width={20}
          height={14}
          style={{ marginRight: "0.5em" }}
          srcSet={`https://flagcdn.com/w40/${country_def_code.toLowerCase()}.png 2x`}
          src={`https://flagcdn.com/w20/${country_def_code.toLowerCase()}.png`}
          alt={`Flag of ${country_def_label}`}
        />
      ) : null}
      <Select placeholder="Lang" onChange={(event, value) => handleLangChange(value)}>
        {countries.map((country) => (
          <Option sx={{ zIndex: 9999, width: 100 }} key={country.code} value={country.code} label={country.label}>
            <img
              loading="lazy"
              width={20}
              height={14}
              srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
              alt={`Flag of ${country.label}`}
            />({country.code})
            {/* {country.label} ({country.code}) +{country.phone} */}
          </Option>
        ))}
      </Select>

    </Box>
  );
}
export default LangSwitcher;
const Select = React.forwardRef(function CustomSelect(
  props: SelectProps<number, false>,
  ref: React.ForwardedRef<any>,
) {
  const slots: SelectProps<number, false>['slots'] = {
    root: Button,
    listbox: Listbox,
    popup: Popup,
    ...props.slots,
  };

  return <BaseSelect {...props} ref={ref} slots={slots} />;
});

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Button = React.forwardRef(function Button<
  TValue extends {},
  Multiple extends boolean,
>(
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { ownerState, ...other } = props;
  return (
    <StyledButton type="button" {...other} ref={ref}>
      {other.children}
      <UnfoldMoreRoundedIcon />
    </StyledButton>
  );
});

const StyledButton = styled('button', { shouldForwardProp: () => true })(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
//   min-width: 320px;
  padding: 4px 6px;
  border-radius: 8px;
  text-align: left;
  line-height: 1.5;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
//   position: relative;
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &.${selectClasses.focusVisible} {
    outline: 0;
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  & > svg {
    font-size: 1rem;
    position: absolute;
    height: 100%;
    top: 0;
    right: 10px;
  }
  `,
);

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 2px;
  margin: 4px 0;
//   min-width: 320px;
  max-height: 400px;
  border-radius: 12px;
  overflow: auto;
  outline: 0;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 2px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
    };
  `,
);

const Option = styled(BaseOption)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &:focus-visible {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  & img {
    margin-right: 10px;
  }
  `,
);

const Popup = styled('div')`
  z-index: 9999;
`;


const countries = [
  { code: 'GB', label: 'English', phone: '44' },
  { code: 'IT', label: 'Italiano', phone: '39' },
];