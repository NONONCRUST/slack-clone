import { CardContent, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { ChannelDataType } from "../../types/channel";

interface Props {
  channelInfo: ChannelDataType;
}

const ChatHeader: React.FC<Props> = ({ channelInfo }) => {
  return (
    <Grid container component={Paper} variant="outlined">
      <CardContent>
        <Typography variant="h5"># {channelInfo?.name}</Typography>
        <Typography variant="body1">{channelInfo?.detail}</Typography>
      </CardContent>
    </Grid>
  );
};

export default ChatHeader;
