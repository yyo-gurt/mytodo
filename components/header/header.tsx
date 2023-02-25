import useUserInfo from "hooks/useUserInfo";
import Link from "next/link";
import { useRouter } from "next/router";
import { setToken } from "../../services";
import * as authAPI from "services/auth.api"
import styles from "./header.module.scss";
import { useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user, isFetched } = useUserInfo();

  const logout = () => {
    setToken("");
    authAPI.logout().then(() => {
      queryClient.setQueryData(["user"], null);
      router.push("/login");
    });
  };

  return (
    <header id={styles.header}>
      <div className="container">
        <span>{user?.id}</span>
        {user ? <button onClick={logout}>로그아웃</button> : <Link href="login">로그인</Link>}
        {/* <Link href="login">로그인</Link> */}
        {/* <button onClick={logout}>로그아웃</button> */}
      </div>
    </header>
  );
};

export default Header;
