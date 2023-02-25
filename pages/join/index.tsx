import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import * as joinAPI from "../../services/auth.api";
import { JoinForm } from "types/user";
import styles from "./join.module.scss";
import { ResponseError } from "types/common";

type CheckInput = {
  [key in keyof JoinForm]: boolean;
} & {
  idReg: boolean;
  passwordReg: boolean;
  passwordEqualCK: boolean;
};

const Join = () => {
  const router = useRouter();

  const joinMutation = useMutation(
    (param: JoinForm) => {
      return joinAPI.join(param);
    },
    {
      onError(response: ResponseError) {
        if (response.message) alert(response.message);
      },
      onSuccess() {
        router.push("/login");
      },
    }
  );

  const duplicateMutaion = useMutation(
    (param: string) => {
      return joinAPI.duplicateID(param);
    },
    {
      onSuccess(response: boolean) {
        if (response) {
          alert("사용 가능한 아이디입니다.");
        }
        setCheckDuplicate(response);
      },
      onError(error: Error) {
        alert(error.message);
      },
    }
  );

  const [checkInput, setCheckInput] = useState<CheckInput>({
    id: false,
    password: false,
    nickname: false,
    passwordCK: false,
    idReg: false,
    passwordReg: false,
    passwordEqualCK: false,
  });

  const [form, setForm] = useState<JoinForm>({
    id: "",
    password: "",
    nickname: "",
    passwordCK: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    if(name === "id") setCheckDuplicate(false);
  };

  const [checkDuplicate, setCheckDuplicate] = useState<Boolean>(false);

  const handleClick = useCallback(() => {
    const idCheck = {
      id: false,
      idReg: false,
    };

    idCheck.id = !form.id;
    idCheck.idReg = !/^[a-zA-Z\d]{4,12}$/g.test(form.id);

    setCheckInput({ ...checkInput, ...idCheck });

    if (idCheck.id || idCheck.idReg) return;

    duplicateMutaion.mutate(form.id);
  }, [checkInput, form]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formArray = Object.entries(form);
    const checkInputObj: Record<string, boolean> = {};

    formArray.forEach((v) => {
      checkInputObj[v[0]] = !v[1];
    });

    !checkInputObj.passwordCK && (checkInputObj.passwordEqualCK = form.passwordCK !== form.password);
    !checkInputObj.id && (checkInputObj.idReg = !/^[a-zA-Z\d]{4,12}$/g.test(form.id));
    !checkInputObj.password && (checkInputObj.passwordReg = !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/g.test(form.password));

    setCheckInput(checkInputObj as CheckInput);
    if (Object.values(checkInputObj).includes(true)) return;

    if(!checkDuplicate) {
      alert("중복 확인을 해주세요.");
      return;
    }

    joinMutation.mutate(form);
  };

  return (
    <>
      <section id={styles.section} className={styles.join}>
        <div className={styles.container}>
          <div className={styles.join_wrap}>
            <h2>회원가입</h2>
            <div className={styles.join_area}>
              <form onSubmit={handleSubmit}>
                <div>
                  <span>아이디</span>
                  <div>
                    <input type="text" name="id" value={form.id} onChange={handleChange} placeholder="아이디" />
                    <button type="button" onClick={handleClick}>
                      중복확인
                    </button>
                  </div>
                  {!!checkInput.id ? <span className={styles.error}>아이디를 입력해주세요.</span> : !!checkInput.idReg ? <span className={styles.error}>영문자와 숫자만 사용하여 4~12자리의 아이디를 입력해주세요.</span> : null}
                </div>
                <div>
                  <span>닉네임</span>
                  <input type="text" name="nickname" value={form.nickname} onChange={handleChange} placeholder="닉네임" />
                  {!!checkInput.nickname && <span className={styles.error}>닉네임 입력해주세요.</span>}
                </div>
                <div>
                  <span>비밀번호</span>
                  <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="비밀번호" />
                  {!!checkInput.password ? <span className={styles.error}>비밀번호를 입력해주세요.</span> : !!checkInput.passwordReg ? <span className={styles.error}>영문자와 숫자를 포함하여 6~20자리의 비밀번호를 입력해주세요.</span> : null}
                </div>
                <div>
                  <span>비밀번호 확인</span>
                  <input type="password" name="passwordCK" value={form.passwordCK} onChange={handleChange} placeholder="비밀번호 확인" />
                  {!!checkInput.passwordCK ? <span className={styles.error}>비밀번호를 입력해주세요.</span> : !!checkInput.passwordEqualCK ? <span className={styles.error}>비밀번호가 일치하지 않습니다.</span> : null}
                </div>
                <input type="submit" value="가입하기" />
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Join;
