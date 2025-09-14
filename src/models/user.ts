import BaseModel from "./base";

export default interface User extends BaseModel {
  username: string;
  email: string;
  password: string;
}