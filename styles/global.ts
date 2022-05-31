import { css } from "@emotion/react";

export const global = css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: "Noto Sans KR", sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  .no-scrollbar *::-webkit-scrollbar {
    display: none;
  }
`;
