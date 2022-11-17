import RootRedirect from './components/RootRedirect';

import Welcome from 'pages/Welcome';
import Boards from 'pages/Boards';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import Page404 from 'pages/404';
import EditProfile from 'pages/EditProfile';

import { PATH } from './types';

export const PAGES_FOR_ROUTES = [
  { path: PATH.WELCOME, page: <Welcome /> },
  { path: PATH.ROOT, page: <RootRedirect /> },
  { path: PATH.BOARDS, page: <Boards /> },
  { path: PATH.BOARDS_ID, page: <Boards /> },
  { path: PATH.SIGN_IN, page: <SignIn /> },
  { path: PATH.SIGN_UP, page: <SignUp /> },
  { path: PATH.EDIT_PROFILE, page: <EditProfile /> },
  { path: PATH.ROUTES_404, page: <Page404 /> },
];
