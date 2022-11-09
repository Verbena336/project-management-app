export type Inputs = {
  name: string;
  login: string;
  password: string;
};

type ResponseBody = {
  statusCode: number;
  message: string;
};

export type ResponseUser = {
  status?: number;
  data?: ResponseBody;
  id?: string;
  login?: string;
  password?: string;
};
