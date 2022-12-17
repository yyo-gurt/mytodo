import { expressjwt } from 'express-jwt';
import { NextApiRequest, NextApiResponse } from "next";
import getConfig from 'next/config';
import util from 'util';

export type NextConfig = {
  serverRuntimeConfig: {
    secret: string;
    refresh: string;
  }
}

const { serverRuntimeConfig } = getConfig() as NextConfig;

export const jwtMiddleware = async <Request extends NextApiRequest, Response>(req: Request, res: NextApiResponse<Response>) => {
  const middleware = expressjwt({
    secret: serverRuntimeConfig.secret,
    algorithms: ['HS256']
  }).unless({
    path: ['/api/users/authenticate']
  });

  util.promisify(middleware)(req, res);
};