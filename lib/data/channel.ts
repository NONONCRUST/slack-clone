import fs from "fs";
import { ChannelDataType } from "../../types/channel";

export const getChannelList = () => {
  const channelsBuffer = fs.readFileSync("data/channels.json");
  const channelsJSON = channelsBuffer.toString();
  if (!channelsJSON) return [];

  const channelList = JSON.parse(channelsJSON);

  return channelList;
};

export const addChannel = (channel: ChannelDataType) => {
  const channelList = getChannelList();
  const newChannelList = [...channelList, channel];

  fs.writeFileSync("data/channels.json", JSON.stringify(newChannelList));
};
