import { useQuery } from "@tanstack/react-query";
import { setToken } from "services";
import { userInfo } from "services/auth.api";
import { UserResponse } from "types/user";

export default function useUserInfo() {
  const { data, isFetched } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await userInfo();
      if (!user) return null;
      setToken(user.token);
      return user;
    },
    staleTime: 15 * 60 * 1000,
    initialData: null,
  });

  return { user: data?.user, isFetched };
}
