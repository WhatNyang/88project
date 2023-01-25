import React from "react";
import Router from "./shared/Router";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <Router />
      </SnackbarProvider>
    </QueryClientProvider>
  );
};

export default App;
