import axios from ".";
import { ChatAPIBodyType } from "../../types/chat";

export const addChatAPI = (body: ChatAPIBodyType) =>
  axios.post("/api/chat", body);

export const getChatsAPI = () => axios.get("/api/chat");
