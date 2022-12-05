export type signUpRequest = {
  name: string;
  login: string;
  password: string;
};

export type signUpResponse = {
  id: string;
  name: string;
  login: string;
};

export type signInRequest = {
  login: string;
  password: string;
};

export type signInResponse = {
  token: string;
};
