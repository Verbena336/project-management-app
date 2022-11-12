import RootRedirect from './components/RootRedirect';
import SignInPage from 'pages/SignInPage';
import SignUpPage from 'pages/SignUpPage';
import Page404 from 'pages/404';
import Welcome from 'pages/Welcome';

import Boards from 'pages/Boards';
import EditProfilePage from './plugs/EditProfilePage';

import { PATH } from './types';

export const PAGES_FOR_ROUTES = [
  { path: PATH.WELCOME, page: <Welcome /> },
  { path: PATH.ROOT, page: <RootRedirect /> },
  { path: PATH.BOARDS, page: <Boards /> },
  { path: PATH.BOARDS_ID, page: <Boards /> },
  { path: PATH.SIGN_IN, page: <SignInPage /> },
  { path: PATH.SIGN_UP, page: <SignUpPage /> },
  { path: PATH.EDIT_PROFILE, page: <EditProfilePage /> },
  { path: PATH.ROUTES_404, page: <Page404 /> },
];
