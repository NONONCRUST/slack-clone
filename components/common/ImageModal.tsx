import React, { useCallback, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

interface Props {
  modalOpen: boolean;
  closeModal: () => void;
}

const ImageModal: React.FC<Props> = ({ modalOpen, closeModal }) => {
  const [file, setFile] = useState<File | null>(null);

  const onChangeInputFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
      }
    },
    []
  );

  const uploadFile = useCallback(() => {
    const filePath = `chat/${uuidv4()}.${file?.name.split(".").pop()}`;
  }, [file?.name]);

  const onClickSendButton = useCallback(() => {
    closeModal();
    uploadFile();
    setFile(null);
  }, [closeModal, uploadFile]);

  return (
    <Dialog open={modalOpen} onClose={closeModal}>
      <DialogTitle>이미지 보내기</DialogTitle>
      <DialogContent>
        <Input
          margin="dense"
          inputProps={{ accept: "image/jpeg, image/jpg, image/png, image/gif" }}
          type="file"
          fullWidth
          onChange={onChangeInputFile}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>취소</Button>
        <Button onClick={onClickSendButton}>전송</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageModal;
