import apiHandler from "helpers/api/api-handler";
import { NextApiHandler } from "next";
import { User } from '@prisma/client';
import prisma from "lib/prisma";
import JoinFormError, { JoinErrorCode } from "errors/user/JoinFormError";

type JoinForm = Pick<User, 'id' | 'nickname' | 'password'>;

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case 'POST':
      join();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  
  async function join() {
    const { id, nickname, password } = req.body as JoinForm;

    if (!id || !nickname || !password) {
      throw new JoinFormError('아이디, 비밀번호, 닉네임은 필수적으로 입력해야 합니다.', JoinErrorCode.REQUIRED);
    }

    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });

    if (user) {
      throw new JoinFormError('아이디가 존재합니다.', JoinErrorCode.DUPLICATED_ID);
    }

    await prisma.user.create({
      data: {
        id,
        nickname,
        password,
        type: "0"
      }
    });

    res.status(200).send('success');
  }
};

export default apiHandler(handler);