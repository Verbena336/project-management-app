export type Inputs = {
  login: string;
  password: string;
};

type ResponseBody = {
  statusCode: number;
  message: string;
};

export type ResponseSignIn = {
  token: string;
};

export type ErrorSignIn = {
  status: number;
  data: ResponseBody;
};
