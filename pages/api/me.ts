import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { findUser } from "../../lib/data/auth";

const me = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const accessToken = req.body.access_token;
    if (!accessToken) return res.status(400).send("액세스 토큰이 없습니다.");

    const jwtSecret = process.env.JWT_SECRET || "jsonwebtoken";
    const email = jwt.verify(accessToken, jwtSecret);
    if (!email) return res.status(400).send("액세스 토큰 검증에 실패했습니다.");

    const userData = findUser(email as string);

    return res.status(200).send(userData);
  }

  return res.status(405).end();
};

export default me;
