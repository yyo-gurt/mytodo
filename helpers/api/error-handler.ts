import { PrismaClientInitializationError } from "@prisma/client/runtime";
import { NextApiResponse } from "next";

const errorHandler = (err: Error, res: NextApiResponse) => {
  if (err instanceof PrismaClientInitializationError) {
    return res.status(500).json({ message: '서버에 문제가 발생하였습니다.' });
  }
  
  if (typeof err === 'string') {
    return res.status(400).json({ message: err });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Invalid Token' });
  }

  return res.status(500).json({ code: err.name });
};

export default errorHandler;