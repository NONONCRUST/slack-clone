import React from "react";
import {
  Avatar,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import { textAlign } from "@mui/system";

const ChatMessage: React.FC = () => {
  return (
    <ListItem>
      <ListItemAvatar sx={{ alignSelf: "stretch" }}>
        <Avatar sx={{ width: 50, height: 50, mt: 1 }} />
      </ListItemAvatar>
      <Grid container sx={{ ml: 2 }}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "left" }}>
          <ListItemText
            sx={{ display: "flex" }}
            primary={"닉네임"}
            primaryTypographyProps={{ fontWeight: "bold", color: "orange" }}
            secondary={"2022.01.01"}
            secondaryTypographyProps={{ color: "gray", ml: 1 }}
          />
        </Grid>
        <Grid item xs={12}>
          <ListItemText
            sx={{ wordBreak: "break-all" }}
            primary={"채팅메시지입니다."}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default ChatMessage;
