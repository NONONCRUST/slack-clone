import { NextApiRequest, NextApiResponse } from "next";
import { getChannelList, addChannel } from "../../lib/data/channel";

const channel = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const channel = req.body;

    addChannel(channel);

    res.status(200).end();
  }

  if (req.method === "GET") {
    const channels = getChannelList();

    res.status(200).send(channels);
  }

  return res.status(405).end();
};

export default channel;
