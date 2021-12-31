export interface UserData {
  _id: string;
  avatar: string;
  role: number;
  mobile: string;
  address: string;
  username: string;
  userId: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthReduxData {
  token?: string;
  user?: UserData;
}
