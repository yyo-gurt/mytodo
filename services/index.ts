export const setToken = (token: string) => {
  sessionStorage.setItem("Access Token", token);
};

export const getToken = () => {
  return sessionStorage.getItem("Access Token");
}