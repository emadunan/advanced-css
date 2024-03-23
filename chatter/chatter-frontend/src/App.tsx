import { RouterProvider } from "react-router-dom";
import "./App.css";
import {
  Container,
  CssBaseline,
  Grid,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import router from "./components/router";
import { ApolloProvider } from "@apollo/client";
import client from "./constants/apollo-client";
import Guard from "./components/auth/Guard";
import Header from "./components/header/Header";
import AppSnackbar from "./components/snackbar/AppSnackbar";
import ChatList from "./components/chat-list/ChatList";
import { usePath } from "./hooks/usePath";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Routes = () => {
  return (
    <Container>
      <RouterProvider router={router} />
    </Container>
  );
};

const App = () => {
  const { path } = usePath();

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        {path === "/" ? (
          <Guard>
            <Grid container>
              <Grid item md={3}>
                <ChatList />
              </Grid>
              <Grid item md={9}>
                <Routes />
              </Grid>
            </Grid>
          </Guard>
        ) : (
          <Routes />
        )}
        <AppSnackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
