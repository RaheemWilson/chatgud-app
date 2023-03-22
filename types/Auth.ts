export type LoginModel = {
  email: string;
  password: string;
};

export interface CurrentUser {
  user: User;
  token: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  gender: string;
  age: number;
  nationality: string;
}

export interface CreateUser {
  email: string;
  password: string;
  username: string;
  age: string;
  nationality: string;
  proficiency: string;
}
