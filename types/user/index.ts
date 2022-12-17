import { User } from "@prisma/client";

export type UserForm = Pick<User, "id"|"password">

export type UserResponse = {
  user: User;
  token: string;
}