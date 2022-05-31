import React from "react";
import { useSelector } from "../store";
import Button from "@mui/material/Button";
import { Box, Drawer, Toolbar } from "@mui/material";
import Link from "next/link";
import Header from "./Header";
import ChannelMenu from "./ChannelMenu";
import Chat from "./chat/Chat";

const Home: React.FC = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <Box sx={{ display: "flex", backgroundColor: "white" }}>
      <Header />
      <Drawer variant="permanent" sx={{ width: 300 }} className="no-scrollbar">
        <Toolbar />
        <Box sx={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
          <ChannelMenu />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Chat />
      </Box>

      {!isLoggedIn && (
        <>
          <div>
            <Link href="/auth/login">
              <a>
                <Button className="login-button" variant="contained">
                  로그인
                </Button>
              </a>
            </Link>
            <Link href="/auth/signup">
              <a>
                <Button variant="outlined">회원가입</Button>
              </a>
            </Link>
          </div>
        </>
      )}
    </Box>
  );
};

export default Home;
