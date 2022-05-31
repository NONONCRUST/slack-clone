import { NextApiRequest, NextApiResponse } from "next";
import { addUser, userExist } from "../../lib/data/auth";

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const user = req.body;
    const exist = userExist(user.email);
    if (exist) return res.status(409).send("이미 가입된 이메일입니다.");

    addUser(user);

    return res.status(200).end();
  }

  return res.status(405).end();
};

export default signup;
