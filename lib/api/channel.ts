import axios from ".";
import { ChannelAPIBodyType } from "../../types/channel";

export const addChannelAPI = (body: ChannelAPIBodyType) =>
  axios.post("/api/channel", body);

export const getChannelsAPI = () => axios.get("/api/channel");
