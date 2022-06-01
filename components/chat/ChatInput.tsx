import React, { useCallback, useState } from "react";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ImageIcon from "@mui/icons-material/Image";
import SendIcon from "@mui/icons-material/Send";
import { addChatAPI } from "../../lib/api/chat";
import { useSelector } from "../../store";
import { getParsedDate } from "../../lib/utils";

interface Props {
  fetchMessages: () => void;
}

const ChatInput: React.FC<Props> = ({ fetchMessages }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const channel = useSelector((state) => state.channel.currentChannel);
  const user = useSelector((state) => state.user);

  const onChangeMessage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setMessage(event.target.value),
    []
  );

  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") submitMessage();
  };

  const submitMessage = useCallback(async () => {
    if (!message) return;
    setLoading(true);

    const body = {
      email: user.email,
      channel: channel.id,
      message: message,
      timestamp: getParsedDate(new Date()),
    };

    try {
      await addChatAPI(body);
      setMessage("");
      fetchMessages();
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }, [message, channel.id, user.email, fetchMessages]);

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
                <IconButton disabled={loading} onClick={submitMessage}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          autoComplete="off"
          label="메시지 입력"
          fullWidth
          value={message}
          onChange={onChangeMessage}
          onKeyDown={onEnter}
        />
      </Grid>
    </Grid>
  );
};

export default ChatInput;
