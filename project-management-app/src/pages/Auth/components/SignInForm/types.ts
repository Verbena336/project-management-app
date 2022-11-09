export type Inputs = {
  login: string;
  password: string;
};

type ResponseBody = {
  statusCode: number;
  message: string;
};

export type ResponseUser = {
  token: string;
  status?: number;
  data?: ResponseBody;
};
