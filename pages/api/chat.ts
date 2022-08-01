import { NextApiRequest, NextApiResponse } from "next";
import { addChat, getChatListWithUsername } from "../../lib/data/chat";

const chat = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const chats = getChatListWithUsername();

    res.status(200).send(chats);
  }

  if (req.method === "POST") {
    const chat = req.body;

    addChat(chat);

    res.status(200).end();
  }

  res.status(405).end();
};

export default chat;
