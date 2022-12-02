import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import SignBtn from 'components/SignBtn';
import CreateEditModal from 'components/Modals/CreateEditModal';

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

import { loginValue } from 'store/reducers/authSlice';
import { useAppSelector } from 'store/hooks';
import { useAddBoardMutation } from 'store/services/boardsApi';

import '../../utils/i18next';

import { PATH } from 'components/AppRoutes/types';
import { addBoardRequest } from 'store/services/types/boards';

import { muiSignInBtn } from '../../data/styles';

import styles from './index.module.scss';

const { header, inner, control, link, logoWrapper, headerStiky } = styles;

const Header = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  const [isModal, setIsModal] = useState(false);
  const [addBoard] = useAddBoardMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isStiky, setIsStiky] = useState(window.pageYOffset > 0);
  const loginStore = useAppSelector(loginValue);
  const isPublic =
    location.pathname === PATH.ROUTES_404 ||
    location.pathname === PATH.SIGN_UP ||
    location.pathname === PATH.SIGN_IN;

  const handleNewBoard = async (data: addBoardRequest) => {
    try {
      const response = await addBoard(data).unwrap();
      if (response.id) {
        toast.success(t('toastContent.addBoard'));
      } else {
        throw new Error();
      }
    } catch {
      toast.error(t('toastContent.serverError'));
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  const logOut = () => {
    localStorage.removeItem('KanBanToken');
    localStorage.removeItem('KanBanLogin');
    localStorage.removeItem('KanBanId');
    navigate(PATH.WELCOME);
  };

  const handleScroll = () => setIsStiky(window.pageYOffset > 0);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {isModal && (
        <CreateEditModal
          title={t('createBoard.title')}
          description={true}
          handler={handleNewBoard}
          closeHandler={() => setIsModal(!isModal)}
        />
      )}
      <header className={isStiky && !isPublic ? headerStiky : header}>
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
            {!isPublic && (
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
                      onClick={() => setIsModal(true)}
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
                      {t('headerUser.userName', { UserName: loginStore })}
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
    </>
  );
};

export default Header;
