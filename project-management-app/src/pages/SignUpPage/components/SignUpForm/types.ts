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
  login: string;
  password: string;
};

export type ErrorSignUp = {
  status: number;
  data: ResponseBody;
};
