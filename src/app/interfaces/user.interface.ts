
export interface IUser {
  name: string;
  surname: string;
  email: string;
}

export interface ILogin extends Pick<IUser, 'email'>{
  password: string;
}

export interface IRegister extends IUser {
  password: string;
  confirmPassword: string;
}