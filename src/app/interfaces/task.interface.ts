import { IUser } from "./user.interface";

export interface ITask {
  uid: string;
  name: string;
  description: string;
  startDate: Date|string;
  endDate: Date|string;
  status: string;
  users: Pick<IUser, 'uid'>[];

  // users
  assignedUsers?: IUser[];
}


export interface ITaskImage {
  uid: string;
  url: string;
  taskUid: string;
}