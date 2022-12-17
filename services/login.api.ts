import { UserResponse } from "../types/user";

export const login = ():Promise<UserResponse> => {
  // return fetch("api/login");
  return Promise.resolve({
    user: {
      id: "testID",
      password: "abcd",
      nickname: "test",
      type: "00"
    },
    token: "aaaaa",
    message: "fail"
  });
}