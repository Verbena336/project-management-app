import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';

import SignBtn from 'components/SignBtn';

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
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
  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value);
    i18n.changeLanguage(event.target.value);
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
                label={t('headerWelcome.language')}
                onChange={handleChange}
              >
                <MenuItem value={'ru'}>{t('headerWelcome.ru')}</MenuItem>
                <MenuItem value={'en'}>{t('headerWelcome.en')}</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={control}>
            <MuiButton onClick={() => navigate(PATH.SIGN_IN)} variant="outlined" sx={muiSignInBtn}>
              {t('headerWelcome.signIn')}
            </MuiButton>
            <SignBtn onClick={() => navigate(PATH.SIGN_UP)}>{t('headerWelcome.signUp')}</SignBtn>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
