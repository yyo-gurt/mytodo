import { User } from "@prisma/client";
import { NextApiHandler } from "next";
import prisma from "lib/prisma";
import { Message } from "types/error";
import { UserForm } from "types/user";
import jwt from "jsonwebtoken";
import { NextConfig } from 'helpers/api';
import getConfig from "next/config";
import { ACCESS_TOKEN_EXPIRED, REFRESH_TOKEN_EXPIRED } from "lib/constant";
import apiHandler from "helpers/api/api-handler";

const { serverRuntimeConfig } = getConfig() as NextConfig;

type LoginResponse = {
  user: User,
  token: string
}

const handler: NextApiHandler<LoginResponse> = async (req, res) => {
  const form = req.body as UserForm;
  
  switch (req.method) {
    case 'POST':
      return authenticate();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function authenticate() {
    const user = await prisma.user.findUnique({
      where: {
        id: form.id,
      },
    });
    
    if (user?.password !== form.password) {
      throw '아이디 또는 비밀번호가 일치하지 않습니다.';
    }

    try {
      const token = jwt.sign(user, serverRuntimeConfig.secret, { expiresIn: ACCESS_TOKEN_EXPIRED });
      const refreshToken = jwt.sign(user, serverRuntimeConfig.refresh, { expiresIn: REFRESH_TOKEN_EXPIRED });

      res.setHeader('Set-Cookie', `token=${refreshToken}; path=/;`)
      res.status(200).json({
        user: {
          ...user,
          password: ''
        },
        token
      });
    } catch (err) {
      throw '문제가 발생하였습니다. 잠시 후 다시 이용해주시기 바랍니다.';
    }
  }
};

export default apiHandler(handler);