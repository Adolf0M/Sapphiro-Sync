import { IUser } from "./user.interface";

export interface IProject {
  uid: string;
  name: string;
  description: string;
  startDate: Date|string;
  endDate: Date|string;
  status: string;
  users: Pick<IUser, 'uid'>[];
}

export interface ITask {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  userUid: string;
}