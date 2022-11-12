import RootRedirect from './components/RootRedirect';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import Page404 from 'pages/page404';

import Welcome from 'pages/Welcome';
import BoardsPage from './plugs/BoardsPage';
import EditProfilePage from './plugs/EditProfilePage';

import { PATH } from './types';

export const PAGES_FOR_ROUTES = [
  { path: PATH.WELCOME, page: <Welcome /> },
  { path: PATH.ROOT, page: <RootRedirect /> },
  { path: PATH.BOARDS, page: <BoardsPage /> },
  { path: PATH.BOARDS_ID, page: <BoardsPage /> },
  { path: PATH.SIGN_IN, page: <SignIn /> },
  { path: PATH.SIGN_UP, page: <SignUp /> },
  { path: PATH.EDIT_PROFILE, page: <EditProfilePage /> },
  { path: PATH.ROUTES_404, page: <Page404 /> },
];
