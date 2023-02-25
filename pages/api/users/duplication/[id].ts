import prisma from "lib/prisma";
import { NextApiHandler } from "next";
import JoinFormError, { JoinErrorCode } from "errors/user/JoinFormError";

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case 'GET':
      checkId();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  
  async function checkId() {
    const id = req.query.id as string;

    const result = await prisma.user.findUnique({
      where: {
        id
      }
    });
    
    if (result) {
      throw new JoinFormError('중복된 이이디입니다.', JoinErrorCode.DUPLICATED_ID); 
    }

    res.status(200).send('success');
  }
};

export default handler;