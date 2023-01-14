import { JoinForm, UserForm, UserResponse } from "../types/user";

export const login = (param: UserForm): Promise<UserResponse> => {
  return fetch("api/users/authenticate", {
    method: "POST",
    body: JSON.stringify(param),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(async (UserResponse) => {
    const response = await UserResponse.json();

    if(UserResponse.ok)
      return response;
    
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
}

export const join = (param: JoinForm): Promise<void> => {
  return fetch("api/users/user", {
    method: "POST",
    body: JSON.stringify(param),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(async (UserResponse) => {
    
  });
}