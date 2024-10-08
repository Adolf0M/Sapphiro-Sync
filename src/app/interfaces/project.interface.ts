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