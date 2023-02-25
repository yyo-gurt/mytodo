import { JoinForm, UserForm, UserResponse } from "../types/user";

export const login = (param: UserForm): Promise<UserResponse> => {
  return fetch("api/users/authenticate", {
    method: "POST",
    body: JSON.stringify(param),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (UserResponse) => {
    const response = await UserResponse.json();

    if (UserResponse.ok) return response;

    throw response;
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

export const userInfo = (): Promise<UserResponse> => {
  return fetch("api/users/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
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
    return response.json();
  });
};
