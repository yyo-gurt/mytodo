import { User } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { setToken } from '../../services';
import * as loginAPI from '../../services/login.api';
import { useAppDispatch } from '../../store';
import { login } from '../../store/user.slice';
import { ResponseError } from '../../types/common';
import { UserForm, UserResponse } from '../../types/user';
import styles from './login.module.scss'

const Login = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const loginMutation = useMutation(
    async (param: UserForm) => {
      return loginAPI.login();
    },
    {
      onError(response: ResponseError) {
        console.log("error");
        console.log(response);
        if (response.message)
          alert(response.message);
      },
      onSuccess(response:UserResponse) {
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
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" value={form.id} onChange={handleChange} placeholder='아이디' />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder='비밀번호' />
        <button type="submit">LOGIN</button>
      </form>
    </>
  );
}

export default Login;