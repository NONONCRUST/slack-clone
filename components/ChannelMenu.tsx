import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { addChannelAPI, getChannelsAPI } from "../lib/api/channel";
import { ChannelDataType } from "../types/channel";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "../store";
import { channelActions } from "../store/channelSlice";

const ChannelMenu: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelDetail, setChannelDetail] = useState("");
  const [channelList, setChannelList] = useState<ChannelDataType[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);

  const currentChannel = useSelector((state) => state.channel.currentChannel);

  const dispatch = useDispatch();

  const onClickAddIcon = useCallback(() => setModalOpen(true), []);

  const closeModal = useCallback(() => setModalOpen(false), []);

  const getChannelData = useCallback(async () => {
    const res = await getChannelsAPI();
    setChannelList(res.data);
  }, []);

  const onChangeChannelNameInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setChannelName(event.target.value),
    []
  );

  const onChangeChannelDetailInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setChannelDetail(event.target.value),
    []
  );

  const onClickSubmit = useCallback(() => {
    const body = { id: uuidv4(), name: channelName, detail: channelDetail };

    try {
      addChannelAPI(body);
      setModalOpen(false);
      getChannelData();
    } catch (error) {
      console.log(error);
    }
  }, [channelDetail, channelName, getChannelData]);

  const changeChannel = useCallback(
    (channel: ChannelDataType) => {
      if (channel.id === currentChannel.id) return;

      dispatch(channelActions.setCurrentChannel(channel));
    },
    [dispatch, currentChannel.id]
  );

  useEffect(() => {
    if (initialLoad) getChannelData();

    if (channelList.length > 0 && initialLoad) {
      dispatch(channelActions.setCurrentChannel(channelList[0]));
      setInitialLoad(false);
    }
  }, [channelList, initialLoad, dispatch, getChannelData]);

  return (
    <>
      <List sx={{ overflow: "auto", width: 240, backgroundColor: "#4c3c4c" }}>
        <ListItem
          secondaryAction={
            <IconButton sx={{ color: "#9A939B" }} onClick={onClickAddIcon}>
              <AddIcon />
            </IconButton>
          }
        >
          <ListItemIcon sx={{ color: "#9A939B" }}>
            <ArrowDropDownIcon />
          </ListItemIcon>
          <ListItemText
            primary="채널"
            sx={{ wordBreak: "break-all", color: "#9A939B" }}
          />
        </ListItem>
        <List component="div" disablePadding sx={{ pl: 3 }}>
          {channelList.map((channel: ChannelDataType) => (
            <ListItem
              key={channel.id}
              button
              selected={channel.id === currentChannel.id}
              onClick={() => changeChannel(channel)}
            >
              <ListItemText
                primary={`# ${channel.name}`}
                sx={{ wordBreak: "break-all", color: "#918890" }}
              />
            </ListItem>
          ))}
        </List>
      </List>
      <Dialog open={modalOpen} onClose={closeModal}>
        <DialogTitle>채널 추가</DialogTitle>
        <DialogContent>
          <DialogContentText>
            생성할 채널명과 설명을 입력해주세요.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="채널명"
            type="text"
            fullWidth
            variant="standard"
            onChange={onChangeChannelNameInput}
          />
          <TextField
            margin="dense"
            label="설명"
            type="text"
            fullWidth
            variant="standard"
            onChange={onChangeChannelDetailInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>취소</Button>
          <Button onClick={onClickSubmit} variant="contained">
            생성
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChannelMenu;
