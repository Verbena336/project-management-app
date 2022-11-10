import React from 'react';
import { Route, Routes } from 'react-router-dom';

import SignUpForm from 'pages/Auth/components/SignUpForm';
import SignInForm from 'pages/Auth/components/SignInForm';
import Error from 'pages/Error';
import Page404 from 'pages/404';

import WelcomePage from './plugs/WelcomePage';
import BoardsPage from './plugs/BoardsPage';
import EditProfilePage from './plugs/EditProfilePage';

import Redirect from './components/Redirect';
import WelcomeRedirect from './components/WelcomeRedirect';
import BoardsRedirect from './components/BoardsRedirect';

import { PATH } from './types';

const Router = () => {
  return (
    <Routes>
      <Route path={PATH.WELCOME} element={<WelcomePage />} />
      <Route path={PATH.ROOT} element={<Redirect />} />
      <Route path={PATH.BOARDS} element={<WelcomeRedirect />}>
        <Route index element={<BoardsPage />} />
      </Route>
      <Route path={PATH.BOARDS_ID} element={<WelcomeRedirect />}>
        <Route index element={<BoardsPage />} />
      </Route>
      <Route path={PATH.SIGN_IN} element={<BoardsRedirect />}>
        <Route index element={<SignInForm />} />
      </Route>
      <Route path={PATH.SIGN_UP} element={<BoardsRedirect />}>
        <Route index element={<SignUpForm />} />
      </Route>
      <Route path={PATH.EDIT_PROFILE} element={<WelcomeRedirect />}>
        <Route index element={<EditProfilePage />} />
      </Route>
      <Route path={PATH.ROUTES_404} element={<Page404 />} />
      <Route path={PATH.ERROR} element={<Error />} />
    </Routes>
  );
};

export default Router;
