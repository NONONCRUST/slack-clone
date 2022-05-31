import React from "react";
import { Divider, Grid, List, Paper, Toolbar } from "@mui/material";
import ChatHeader from "./ChatHeader";
import { useSelector } from "../../store";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

const Chat: React.FC = () => {
  const channel = useSelector((state) => state.channel.currentChannel);

  return (
    <>
      <Toolbar />
      <ChatHeader channelInfo={channel} />
      <Grid
        container
        component={Paper}
        variant="outlined"
        sx={{ mt: 3, position: "relative" }}
      >
        <List
          sx={{
            height: "calc(100vh - 350px)",
            overflow: "scroll",
            width: "100%",
            position: "relative",
          }}
        >
          <ChatMessage />
        </List>
        <Divider />
        <ChatInput />
      </Grid>
    </>
  );
};

export default Chat;
