import { User } from "@prisma/client";

export type UserForm = Pick<User, "id"|"password">