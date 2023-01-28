import React from "react";
import Router from "./shared/Router";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import GlobalStyles from "./shared/GlobalStyled";

const theme = createTheme({
  typography: {
    fontFamily: "GmarketSans",
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <Router />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
