import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { setToken } from '../../services';
import * as loginAPI from '../../services/login.api';
import { ResponseError } from '../../types/common';
import { UserForm, UserResponse } from '../../types/user';
import styles from './login.module.scss'

const Login = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const loginMutation = useMutation(
    (param: UserForm) => {
      return loginAPI.login(param);
    },
    {
      onError(response: ResponseError) {
        console.log("error");
        console.log(response);
        if (response.message)
          alert(response.message);
      },
      onSuccess(response: UserResponse) {
        console.log("success");
        console.log(response);
        queryClient.setQueryData(["user"], response.user);
        setToken(response.token);
        router.push("/");
      }
    }
  );

  const [form, setForm] = useState<UserForm>({
    id: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.id)
      return alert("아이디를 입력하세요.");
    else if (!form.password)
      return alert("비밀번호를 입력하세요.");

    loginMutation.mutate(form);
  }

  return (
    <>
      <section id={styles.section} className={styles.login}>
        <div className={styles.container}>
          <div className={styles.login_wrap}>
            <h2>로그인</h2>
            <div className={styles.login_area}>
              <form onSubmit={handleSubmit}>
                <div>
                  <span>아이디</span>
                  <input type="text" name="id" value={form.id} onChange={handleChange} placeholder='아이디' />
                </div>
                <div>
                  <span>비밀번호</span>
                  <input type="password" name="password" value={form.password} onChange={handleChange} placeholder='비밀번호' />
                </div>
                <input type="submit" value="로그인" />
              </form>
            </div>
            <ul className={styles.find_area}>
              <li>아이디 찾기</li>
              <li>비밀번호 찾기</li>
            </ul>
            <ul className={styles.sns_area}>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <p className={styles.join_area}>처음 방문하셨나요?<Link href="/join" className={styles.joinBtn}>회원가입</Link></p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;