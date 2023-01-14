import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as joinAPI from '../../services/login.api';
import { JoinForm, UserResponse } from 'types/user';
import styles from './join.module.scss'
import { ResponseError } from 'types/common';
import { setToken } from 'services';
import { format } from 'path';

type CheckInput = {
  [key in keyof JoinForm]: boolean
}

const Join = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const joinMutation = useMutation(
    (param: JoinForm) => {
      return joinAPI.login(param);
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

  const [checkInput, setCheckInput] = useState<CheckInput>({
    id: false,
    password: false,
    nickname: false,
    passwordCK: false
  });

  const [form, setForm] = useState<JoinForm>({
    id: "",
    password: "",
    nickname: "",
    passwordCK: ""
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

    const formArray = Object.entries(form);
    const checkInputObj:Record<string, boolean> = {};
    for (let i = 0; i < formArray.length; i++) {
      checkInputObj[formArray[i][0]] = !formArray[i][1];  
    }
    setCheckInput(checkInputObj as CheckInput);
    if (Object.values(checkInputObj).includes(true)) return;

    joinMutation.mutate(form);
  }

  return (
    <>
      <section>
        <div className={styles.container}>
          <h2>JOIN</h2>
          <form onSubmit={handleSubmit}>
            <ul>
              <li>
                <span>아이디</span>
                <input type="text" name="id" value={form.id} onChange={handleChange} placeholder='아이디' />
                {
                  !!checkInput.id && <span className='id_ck'>아이디를 입력해주세요.</span>
                }
                <input type="button" value="중복확인" />
              </li>
              <li>
                <span>비밀번호</span>
                <input type="password" name="password" value={form.password} onChange={handleChange} placeholder='비밀번호' />
              </li>
              <li>
                <span>비밀번호 확인</span>
                <input type="password" name="passwordCK" value={form.passwordCK} onChange={handleChange} placeholder='비밀번호 확인' />
              </li>
              <li>
                <span>닉네임</span>
                <input type="text" name="nickname" value={form.nickname} onChange={handleChange} placeholder='닉네임' />
              </li>
            </ul>
            <button type="submit">회원가입</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Join;