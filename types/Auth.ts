export type LoginModel = {
    email: string;
    password: string;
}

export interface CurrentUser {
    user: User
    token: string
  }
  
  export interface User {
    id: string
    username: string
    email: string
    gender: string
    age: number
    nationality: string
  }