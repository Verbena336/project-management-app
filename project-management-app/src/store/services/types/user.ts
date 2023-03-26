export type usersResponse = {
  id: string;
  name: string;
  login: string;
}[];

export type userBody = {
  name: string;
  login: string;
  password: string;
};

export type userRequest = {
  id: string;
  body: userBody;
};

export type userResponse = {
  id: string;
  name: string;
  login: string;
};
