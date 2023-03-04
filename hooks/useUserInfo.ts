import { useQuery } from "@tanstack/react-query";
import { getToken, setToken } from "services";
import { userInfo } from "services/auth.api";

export default function useUserInfo() {
  const { data, isFetched } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (!getToken()) {
        return null;
      }

      const user = await userInfo(getToken() || "");
      if (!user) return null;
      setToken(user.token);
      return user;
    },
    staleTime: 15 * 60 * 1000,
    initialData: null,
  });

  return { user: data?.user, isFetched };
}
