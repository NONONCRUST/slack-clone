import fs from "fs";
import { ChatAPIBodyType } from "../../types/chat";
import { UserDataType } from "../../types/user";
import { getUserList } from "./auth";

export const getChatList = () => {
  const chatsBuffer = fs.readFileSync("data/chats.json");
  const chatsJSON = chatsBuffer.toString();
  if (!chatsJSON) return [];

  const chatList = JSON.parse(chatsJSON);

  return chatList;
};

export const getChatListWithUsername = () => {
  const chatList = getChatList();

  const chatListWithUsername = chatList.map((chat: ChatAPIBodyType) => {
    const userList = getUserList();

    const userInfo = userList.find(
      (user: UserDataType) => user.email === chat.email
    );

    const username = userInfo?.name;

    return { username, ...chat };
  });

  return chatListWithUsername;
};

export const addChat = (chat: ChatAPIBodyType) => {
  const chatList = getChatList();
  const newChatList = [...chatList, chat];

  fs.writeFileSync("data/chats.json", JSON.stringify(newChatList));
};
