import axios from ".";
import { SignUpAPIBodyType } from "../../types/user";

// 회원가입
export const signupAPI = (body: SignUpAPIBodyType) =>
  axios.post("/api/signup", body);

// 로그인
export const loginAPI = (body: { email: string; password: string }) =>
  axios.post("/api/login", body);

// 쿠키의 access_token의 유저 정보
export const meAPI = (body: { access_token: string }) =>
  axios.post("/api/me", body);

// 로그아웃
export const logoutAPI = () => axios.delete("/api/logout");
