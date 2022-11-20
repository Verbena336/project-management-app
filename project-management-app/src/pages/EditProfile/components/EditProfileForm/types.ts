export type Inputs = {
  name: string;
  login: string;
  password: string;
};

type ResponseBody = {
  statusCode: number;
  message: string;
};

export type ResponseSignUp = {
  id: string;
  name: string;
  login: string;
};

export type ErrorSignUp = {
  status: number;
  data: ResponseBody;
};
