import JoinFormError, { JoinErrorCode } from "errors/user/JoinFormError";
import prisma from "lib/prisma";
import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "GET":
      const id = req.body as string;
      return checkId(id);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }    

  async function checkId(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });

    if (user) {
      throw new JoinFormError('아이디가 존재합니다.', JoinErrorCode.DUPLICATED_ID);
    }

    res.status(200).send('success');
  }
};

export default handler;