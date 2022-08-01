import React from "react";
import {
  Avatar,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { ChatDataType } from "../../types/chat";
import { useSelector } from "../../store";

interface Props {
  message: ChatDataType;
}

const ChatMessage: React.FC<Props> = ({ message }) => {
  const currentUser = useSelector((state) => state.user);

  const { username, timestamp } = message;

  return (
    <ListItem>
      <ListItemAvatar sx={{ alignSelf: "stretch" }}>
        <Avatar sx={{ width: 50, height: 50, mt: 1 }} />
      </ListItemAvatar>
      <Grid container sx={{ ml: 2 }}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "left" }}>
          <ListItemText
            sx={{ display: "flex" }}
            primary={username}
            primaryTypographyProps={{
              fontWeight: "bold",
              color: message.email === currentUser?.email ? "orange" : "black",
            }}
            secondary={timestamp}
            secondaryTypographyProps={{ color: "gray", ml: 1 }}
          />
        </Grid>
        <Grid item xs={12}>
          <ListItemText
            sx={{ wordBreak: "break-all" }}
            primary={message.message}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default ChatMessage;
