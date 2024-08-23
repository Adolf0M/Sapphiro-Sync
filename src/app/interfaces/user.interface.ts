
export interface IUser {
  uid: string;
  name: string;
  surname: string;
  email: string;
}

export interface ILogin extends Pick<IUser, 'email'>{
  password: string;
}

export interface IRegister extends Omit<IUser, 'uid'> {
  password: string;
  confirmPassword: string;
}