import { CircularProgress, Stack } from "@mui/material";
import React from "react";

const Loading: React.FC = () => {
  return (
    <Stack alignItems="center" justifyContent="center" height="100vh">
      <CircularProgress color="secondary" size={150} />
    </Stack>
  );
};

export default Loading;
