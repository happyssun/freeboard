import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../commons/stores";

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  useEffect(() => {
    const result = localStorage.getItem("accessToken");
    setAccessToken(result ?? "");
  }, []);

  const httpLink = createHttpLink({
    uri: "http://backendonline.codebootcamp.co.kr/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  });

  const client = useMemo(() => {
    return new ApolloClient({
      link: ApolloLink.from([authLink, httpLink]),
      cache: new InMemoryCache(),
    });
  }, [authLink, httpLink]);

  useEffect(() => {
    return () => {
      // 컴포넌트가 언마운트될 때 클라이언트 정리
      client.stop();
    };
  }, [client]);

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
