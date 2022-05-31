import App from "next/app";
import type { AppProps } from "next/app";
import { wrapper } from "../store";
import { Global } from "@emotion/react";
import { global } from "../styles/global";
import { meAPI } from "../lib/api/auth";
import { userActions } from "../store/userSlice";

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Global styles={global} />
      <Component {...pageProps} />
    </>
  );
};

app.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (context: any) => {
    console.log("@@@ getInitialProps @@@");
    const appInitialProps = await App.getInitialProps(context);

    const state = store.getState();

    const isLoggedIn = state.user.isLoggedIn;

    const cookie = context.ctx.req?.cookies;

    try {
      if (!isLoggedIn && cookie.access_token) {
        const res = await meAPI({ access_token: cookie.access_token });

        const userData = res.data;

        const { name, email } = userData;

        store.dispatch(userActions.login({ name, email }));
      }
    } catch (error) {
      console.log(error);
    }

    return { ...appInitialProps };
  }
);

export default wrapper.withRedux(app);
