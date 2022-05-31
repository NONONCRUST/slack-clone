import React from "react";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ImageIcon from "@mui/icons-material/Image";
import SendIcon from "@mui/icons-material/Send";

const ChatInput: React.FC = () => {
  return (
    <Grid container sx={{ p: "20px" }}>
      <Grid item xs={12} sx={{ position: "relative" }}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <InsertEmoticonIcon />
                </IconButton>
                <IconButton>
                  <ImageIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          autoComplete="off"
          label="메시지 입력"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default ChatInput;
