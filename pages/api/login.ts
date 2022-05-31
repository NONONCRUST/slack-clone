import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserList } from "../../lib/data/auth";
import { UserDataType } from "../../types/user";

const login = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const userData = getUserList();
    const user = userData.find((user: UserDataType) => user.email === email);
    if (!user) return res.status(400).send("가입된 유저가 없습니다.");

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) return res.status(400).send("비밀번호가 다릅니다.");

    const jwtSecret = process.env.JWT_SECRET || "jsonwebtoken";
    const token = jwt.sign(user.email, jwtSecret);
    res.setHeader("Set-Cookie", `access_token=${token}; path=/; httponly`);

    return res.status(200).send({ name: user.name, email: user.email });
  }

  return res.status(405).end();
};

export default login;
