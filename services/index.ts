export const setToken = (token: string) => {
  sessionStorage.setItem("Access Token", token);
};

export const getToken = () => {
  sessionStorage.getItem("Access Token");
}