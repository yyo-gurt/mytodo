import { JoinForm, UserForm, UserResponse } from "../types/user";

export const login = (param: UserForm): Promise<UserResponse> => {
  return fetch("api/users/authenticate", {
    method: "POST",
    body: JSON.stringify(param),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (UserResponse) => {
    if (!UserResponse.ok) throw new Error("로그인에 실패했습니다.");
    const response = await UserResponse.json();
    return response;
  });

  // return Promise.resolve({
  //   user: {
  //     id: "testID",
  //     password: "abcd",
  //     nickname: "test",
  //     type: "00"
  //   },
  //   token: "aaaaa",
  //   message: "fail"
  // });
};

export const join = (param: JoinForm): Promise<void> => {
  return fetch("api/users/user", {
    method: "POST",
    body: JSON.stringify(param),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (UserResponse) => {});
};

export const userInfo = (token: string): Promise<UserResponse> => {
  return fetch(`api/users/user?token=${token}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) throw new Error("로그인에 실패했습니다.");
    return response.json();
  });
};

export const logout = () => {
  return fetch("api/users/authenticate", {
    method: "DELETE",
  });
};

export const duplicateID = (param: string):Promise<boolean> => {
  return fetch(`api/users/duplication/${param}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok)
      throw new Error("사용 불가능한 아이디입니다.");
    return response.json();
  });
};
