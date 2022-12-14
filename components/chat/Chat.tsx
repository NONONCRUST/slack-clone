import React, { useCallback, useEffect, useRef, useState } from "react";
import { Divider, Grid, List, Paper, Toolbar } from "@mui/material";
import ChatHeader from "./ChatHeader";
import { useSelector } from "../../store";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { getChatsAPI } from "../../lib/api/chat";
import { ChatDataType } from "../../types/chat";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatDataType[]>([]);

  const currentChannel = useSelector((state) => state.channel.currentChannel);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const fetchMessages = useCallback(async () => {
    const res = await getChatsAPI();
    const messages = res.data.filter((message: ChatDataType) => {
      return message.channel === currentChannel.id;
    });
    setMessages(messages);
  }, [currentChannel]);

  useEffect(() => {
    if (!currentChannel) return;

    fetchMessages();
  }, [currentChannel, fetchMessages]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages.length]);

  return (
    <>
      <Toolbar />
      <ChatHeader channelInfo={currentChannel} />
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
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          <div ref={chatEndRef} />
        </List>
        <Divider />
        <ChatInput fetchMessages={fetchMessages} />
      </Grid>
    </>
  );
};

export default Chat;
