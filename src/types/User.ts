export interface User {
  id: string;
  username: string;
  password: string;
  nickname: string;
  photo: string;
  createDate: Date;
  friends: string[];
  groups: string[];
  rooms: string[];
}
