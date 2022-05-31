import React, { useCallback, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";
import bcrypt from "bcryptjs";
import { signupAPI } from "../lib/api/auth";
import { useRouter } from "next/router";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const isPasswordVaild =
    !(password.length < 6 || passwordConfirm.length < 6) &&
    password === passwordConfirm;

  const onChangeName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    []
  );

  const onChangeEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    []
  );

  const onChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    []
  );

  const onChangePasswordConfirm = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordConfirm(event.target.value);
    },
    []
  );
  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!name || !email || !password || !passwordConfirm) {
        setErrorMessage("모든 항목을 입력해주세요");
        return;
      }

      if (!isPasswordVaild) {
        setErrorMessage("비밀번호를 확인하세요.");
        return;
      }

      const hashedPassword = bcrypt.hashSync(password, 8);

      const data = { name, email, password: hashedPassword };

      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");

      try {
        await signupAPI(data);
        router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
    [email, isPasswordVaild, name, password, passwordConfirm, router]
  );

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <TagIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                required
                fullWidth
                label="닉네임"
                autoFocus
                value={name}
                onChange={onChangeName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                required
                fullWidth
                label="이메일 주소"
                autoComplete="off"
                value={email}
                onChange={onChangeEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                required
                fullWidth
                label="비밀번호"
                type="password"
                value={password}
                onChange={onChangePassword}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="passwordConfirm"
                required
                fullWidth
                label="비밀번호 확인"
                type="password"
                value={passwordConfirm}
                onChange={onChangePasswordConfirm}
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          {errorMessage && (
            <Alert sx={{ mt: 3 }} severity="error">
              {errorMessage}
            </Alert>
          )}
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            회원가입
          </LoadingButton>
          <Grid container justifyContent={"center"}>
            <Grid item>
              <span>이미 계정이 있나요? </span>
              <Link href="/auth/login">
                <a style={{ color: "blue" }}>로그인</a>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
