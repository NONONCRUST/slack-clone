import axios from ".";
import { ChannelAPIBody } from "../../types/channel";

export const addChannelAPI = (body: ChannelAPIBody) =>
  axios.post("/api/channel", body);

export const getChannelsAPI = () => axios.get("/api/channel");
