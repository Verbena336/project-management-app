import RootRedirect from './components/RootRedirect';

import Welcome from 'pages/Welcome';
import Boards from 'pages/Boards';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import Page404 from 'pages/404';
import Board from 'pages/Board';

import EditProfilePage from './plugs/EditProfilePage';

import { PATH } from './types';

export const PAGES_FOR_ROUTES = [
  { path: PATH.WELCOME, page: <Welcome /> },
  { path: PATH.ROOT, page: <RootRedirect /> },
  { path: PATH.BOARDS, page: <Boards /> },
  { path: PATH.BOARDS_ID, page: <Board /> },
  { path: PATH.SIGN_IN, page: <SignIn /> },
  { path: PATH.SIGN_UP, page: <SignUp /> },
  { path: PATH.EDIT_PROFILE, page: <EditProfilePage /> },
  { path: PATH.ROUTES_404, page: <Page404 /> },
];
