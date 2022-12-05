import Redirect from './components/Redirect';

import Welcome from 'pages/Welcome';
import Boards from 'pages/Boards';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import Page404 from 'pages/404';
import EditProfile from 'pages/EditProfile';
import Columns from 'pages/Columns';

import { PATH } from './types';

export const PAGES_FOR_ROUTES = [
  {
    path: PATH.WELCOME,
    page: <Welcome />,
  },
  {
    path: PATH.ROOT,
    page: (
      <Redirect>
        <Welcome />
      </Redirect>
    ),
  },
  {
    path: PATH.BOARDS,
    page: (
      <Redirect>
        <Boards />
      </Redirect>
    ),
  },
  {
    path: PATH.BOARDS_ID,
    page: (
      <Redirect>
        <Columns />
      </Redirect>
    ),
  },
  {
    path: PATH.SIGN_IN,
    page: (
      <Redirect>
        <SignIn />
      </Redirect>
    ),
  },
  {
    path: PATH.SIGN_UP,
    page: (
      <Redirect>
        <SignUp />
      </Redirect>
    ),
  },
  {
    path: PATH.EDIT_PROFILE,
    page: (
      <Redirect>
        <EditProfile />
      </Redirect>
    ),
  },
  { path: PATH.ROUTES_404, page: <Page404 /> },
];
