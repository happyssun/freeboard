import { AppProps } from "next/app";
import ApolloSetting from "../src/components/commons/apollo";
import Layout from "../src/components/commons/layout_class";
import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloSetting>
      <>
        <Global styles={globalStyles} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    </ApolloSetting>
  );
}

export default MyApp;
