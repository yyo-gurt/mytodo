import { User } from "@prisma/client";

export type UserForm = Pick<User, "id" | "password">

export type UserResponse = {
  user: User;
  token: string;
}

export type JoinForm = Pick<User, "id" | "password" | "nickname"> & {
  passwordCK: string;
}
