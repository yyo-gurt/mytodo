import apiHandler from "helpers/api/api-handler";
import { NextApiHandler } from "next";
import { User } from "@prisma/client";
import prisma from "lib/prisma";
import JoinFormError, { JoinErrorCode } from "errors/user/JoinFormError";
import jwt from "jsonwebtoken";
import getConfig from "next/config";
import { NextConfig } from "helpers/api";
import { ACCESS_TOKEN_EXPIRED, REFRESH_TOKEN_EXPIRED } from "lib/constant";

type JoinForm = Pick<User, "id" | "nickname" | "password">;

const { serverRuntimeConfig } = getConfig() as NextConfig;

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "GET":
      return getUser();
    case "POST":
      return join();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getUser() {
    const token = req.query.token as string;
    const { id } = jwt.verify(token, serverRuntimeConfig.secret) as { id: string };
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw "회원이 존재하지 않습니다."

    const _token = jwt.sign({ id: user.id }, serverRuntimeConfig.secret, { expiresIn: ACCESS_TOKEN_EXPIRED });
    const refreshToken = jwt.sign({ id: user.id }, serverRuntimeConfig.refresh, { expiresIn: REFRESH_TOKEN_EXPIRED });

    res.setHeader("Set-Cookie", `token=${refreshToken}; path=/;`);
    res.status(200).json({
      user: {
        ...user,
        password: "",
      },
      token: _token,
    });
  }

  async function join() {
    const { id, nickname, password } = req.body as JoinForm;

    if (!id || !nickname || !password) {
      throw new JoinFormError("아이디, 비밀번호, 닉네임은 필수적으로 입력해야 합니다.", JoinErrorCode.REQUIRED);
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (user) {
      throw new JoinFormError("아이디가 존재합니다.", JoinErrorCode.DUPLICATED_ID);
    }

    await prisma.user.create({
      data: {
        id,
        nickname,
        password,
        type: "0",
      },
    });

    res.status(200).send("success");
  }
};

export default apiHandler(handler);
