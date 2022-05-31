import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useSelector } from "../store";

const MyPage: React.FC = () => {
  const name = useSelector((state) => state.user.name);
  const email = useSelector((state) => state.user.email);

  return (
    <Link href="/">
      <a>
        <Button variant="contained">홈</Button>
        <p>{`닉네임: ${name}`}</p>
        <p>{`이메일: ${email}`}</p>
      </a>
    </Link>
  );
};

export default MyPage;
