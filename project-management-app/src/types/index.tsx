import { ReactNode } from 'react';

export type LayoutContent = {
  children: ReactNode;
};

export enum PATH {
  WELCOME = '/welcome',
  ROOT = '/',
  BOARDS = '/boards',
  BOARDS_ID = '/boards/:boardId',
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

type ResponseBody = {
  statusCode: number;
  message: string;
};

export type TError = {
  status: number;
  data: ResponseBody;
};
