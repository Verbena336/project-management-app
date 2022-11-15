import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import SignBtn from 'components/SignBtn';

import {
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import MuiButton from '@mui/material/Button';

import '../../utils/i18next';

import { muiSignInBtn } from '../../data/styles';

import styles from './index.module.scss';

const { header, inner, control, link, logoWrapper } = styles;

import { PATH } from 'components/AppRoutes/types';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(localStorage.getItem('i18nextLng') ?? 'ru');
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  const logOut = () => {
    localStorage.removeItem('KanBanToken');
    localStorage.removeItem('KanBanLogin');
    navigate(PATH.WELCOME);
  };

  return (
    <header className={header}>
      <div className="container">
        <div className={inner}>
          <div className={logoWrapper}>
            <div className={link}>
              <NavLink to="/" className="icon-app-logo" />
            </div>
            <FormControl size="small">
              <InputLabel id="lang-lable">{t('headerWelcome.language')}</InputLabel>
              <Select
                labelId="lang-label"
                defaultValue={lang}
                value={lang}
                label={t('headerWelcome.language')}
                onChange={handleChange}
              >
                <MenuItem value={'ru'}>{t('headerWelcome.ru')}</MenuItem>
                <MenuItem value={'en'}>{t('headerWelcome.en')}</MenuItem>
              </Select>
            </FormControl>
          </div>
          {!(
            location.pathname === PATH.ROUTES_404 ||
            location.pathname === PATH.EDIT_PROFILE ||
            location.pathname === PATH.SIGN_UP ||
            location.pathname === PATH.SIGN_IN
          ) && (
            <div className={control}>
              {location.pathname === PATH.WELCOME ? (
                localStorage.getItem('KanBanToken') ? (
                  <SignBtn onClick={() => navigate(PATH.BOARDS)}>
                    {t('headerUser.goToMain')}
                  </SignBtn>
                ) : (
                  <>
                    <MuiButton
                      onClick={() => navigate(PATH.SIGN_IN)}
                      variant="outlined"
                      sx={muiSignInBtn}
                    >
                      {t('headerWelcome.signIn')}
                    </MuiButton>
                    <SignBtn onClick={() => navigate(PATH.SIGN_UP)}>
                      {t('headerWelcome.signUp')}
                    </SignBtn>
                  </>
                )
              ) : (
                <>
                  <MuiButton
                    variant="text"
                    startIcon={<div className="icon-add-board-header"></div>}
                  >
                    {t('headerUser.newBoard')}
                  </MuiButton>
                  <MuiButton
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    variant="text"
                    startIcon={<div className="icon-profile-user"></div>}
                  >
                    {localStorage.getItem('KanBanLogin')}
                  </MuiButton>
                  <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                    <MenuItem onClick={() => navigate(PATH.EDIT_PROFILE)}>
                      <ListItemIcon>
                        <div className="icon-profile-edit"></div>
                      </ListItemIcon>
                      <ListItemText>{t('headerUser.edit')}</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={logOut}>
                      <ListItemIcon>
                        <div className="icon-profile-exit"></div>
                      </ListItemIcon>
                      <ListItemText>{t('headerUser.logOut')}</ListItemText>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
