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
import { useDispatch } from "../store";
import { useRouter } from "next/router";
import { loginAPI } from "../lib/api/auth";
import { userActions } from "../store/userSlice";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const router = useRouter();

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

  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!email || !password) {
        setErrorMessage("이메일과 비밀번호를 확인하세요");
        return;
      }

      const body = { email, password };

      try {
        const res = await loginAPI(body);
        const { name, email } = res.data;
        dispatch(userActions.login({ name, email }));
        router.push("/");
      } catch (error) {
        console.log(error);
        setErrorMessage("이메일과 비밀번호를 확인하세요.");
      }
    },
    [dispatch, email, password, router]
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
          로그인
        </Typography>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
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
            로그인
          </LoadingButton>
          <Grid container justifyContent={"center"}>
            <Grid item>
              <span>아직 계정이 없으신가요? </span>
              <Link href="/auth/signup">
                <a style={{ color: "blue" }}>회원가입</a>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
