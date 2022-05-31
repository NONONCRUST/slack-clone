import React, { useCallback, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import { useDispatch, useSelector } from "../store";
import { userActions } from "../store/userSlice";
import { logoutAPI } from "../lib/api/auth";
import Link from "next/link";

const Header: React.FC = () => {
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(
    null
  );

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const dispatch = useDispatch();

  const onClickIconButton = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) =>
      setAnchorElement(event.currentTarget),
    []
  );

  const onCloseMenu = useCallback(() => setAnchorElement(null), []);

  const onClickLogOut = useCallback(() => {
    dispatch(userActions.logout());
    logoutAPI();
  }, [dispatch]);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          color: "#9A939B",
          backgroundColor: "#4c3c4d",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "50px",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <TagIcon sx={{ mt: 0.4 }} />
            <Typography variant="h6" component="div">
              SLACK
            </Typography>
          </Box>
          <Box>
            {isLoggedIn && (
              <>
                <IconButton onClick={onClickIconButton}>
                  <Avatar sx={{ ml: "10px" }} alt="profileImage" />
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  anchorEl={anchorElement}
                  onClose={onCloseMenu}
                  open={Boolean(anchorElement)}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem>
                    <Typography textAlign="center">프로필이미지</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography onClick={onClickLogOut} textAlign="center">
                      로그아웃
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
            {!isLoggedIn && (
              <>
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
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
