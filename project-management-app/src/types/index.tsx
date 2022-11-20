import { ReactNode } from 'react';

export type LayoutContent = {
  children: ReactNode;
};

export enum PATH {
  WELCOME = '/welcome',
  ROOT = '/',
  BOARDS = '/boards',
  BOARDS_ID = '/boards/:id',
  SIGN_IN = '/signin',
  SIGN_UP = '/signup',
  EDIT_PROFILE = '/editprofile',
  ROUTES_404 = '*',
  ERROR = '/error',
}

export type CreateRequest = {
  title: string;
  description: string;
};
