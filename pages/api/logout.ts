import { NextApiRequest, NextApiResponse } from "next";

const logout = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "DELETE") {
      res.setHeader(
        "Set-Cookie",
        "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
      );
      return res.status(204).end();
    }
  } catch (error) {
    console.log(error);
    return res.send(error);
  }

  return res.status(405).end();
};

export default logout;
