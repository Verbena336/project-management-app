import React from 'react';
import { Route, Routes } from 'react-router-dom';

import SignInPage from 'pages/SignInPage';
import SignUpPage from 'pages/SignUpPage';
import ErrorPage from 'pages/ErrorPage';
import Page404 from 'pages/page404';

import WelcomePage from './plugs/WelcomePage';
import BoardsPage from './plugs/BoardsPage';
import EditProfilePage from './plugs/EditProfilePage';

import RootRedirect from './components/RootRedirect';
import WelcomeRedirect from './components/WelcomeRedirect';
import BoardsRedirect from './components/BoardsRedirect';

import { PATH } from './types';

const Router = () => {
  return (
    <Routes>
      <Route path={PATH.WELCOME} element={<WelcomePage />} />
      <Route path={PATH.ROOT} element={<RootRedirect />} />
      <Route path={PATH.BOARDS} element={<WelcomeRedirect />}>
        <Route index element={<BoardsPage />} />
      </Route>
      <Route path={PATH.BOARDS_ID} element={<WelcomeRedirect />}>
        <Route index element={<BoardsPage />} />
      </Route>
      <Route path={PATH.SIGN_IN} element={<BoardsRedirect />}>
        <Route index element={<SignInPage />} />
      </Route>
      <Route path={PATH.SIGN_UP} element={<BoardsRedirect />}>
        <Route index element={<SignUpPage />} />
      </Route>
      <Route path={PATH.EDIT_PROFILE} element={<WelcomeRedirect />}>
        <Route index element={<EditProfilePage />} />
      </Route>
      <Route path={PATH.ROUTES_404} element={<Page404 />} />
      <Route path={PATH.ERROR} element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
