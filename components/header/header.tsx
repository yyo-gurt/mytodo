import useUserInfo from "hooks/useUserInfo";
import Link from "next/link";
import { useRouter } from "next/router";
import { setToken } from "../../services";
import styles from "./header.module.scss";

const Header = () => {
  const router = useRouter();
  const { user, isFetched } = useUserInfo();
  console.log(user);

  const logout = () => {
    setToken("");
    
    router.push("/login");
  };

  return (
    <header id={styles.header}>
      <div className="container">
        <span>{user?.id}</span>
        {/* {user ? <button>로그아웃</button> : <Link href="login">로그인</Link>} */}
        <Link href="login">로그인</Link>
        <button onClick={logout}>로그아웃</button>
      </div>
    </header>
  );
};

export default Header;
