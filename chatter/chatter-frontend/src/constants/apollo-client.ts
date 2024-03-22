import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { API_URL } from "./urls";
import { execludedRoutes } from "./excluded-routes";
import { onLogout } from "../utils/onLogout";

const logoutLink = onError(({ graphQLErrors }) => {
  if (
    graphQLErrors?.length &&
    (graphQLErrors[0].extensions.originalError as any).statusCode === 401
  ) {
    console.log("gqlErrors", graphQLErrors);
    
    if (!execludedRoutes.includes(window.location.pathname)) {
      onLogout()
    }
  }
});

const httpLink = new HttpLink({ uri: `${API_URL}/graphql` });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(httpLink),
});

export default client;
