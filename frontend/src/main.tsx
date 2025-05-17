import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { StyledEngineProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";

import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

//Font

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  mutationCache: new MutationCache({
    onError: (err: any) => {
      const errData = err?.response?.data;

      if (!errData) {
        alert("An unexpected error occurred.");
        return;
      }

      if ("errors" in errData && typeof errData.errors === "object") {
        const errors = errData.errors;
        const errorMessages = Object.values(errors)
          .map((error: any) => error?.message || "Unknown error")
          .filter(Boolean);

        alert(errorMessages.join("\n"));
      } else if (errData.message) {
        alert(errData.message);
      } else {
        alert("An unknown error occurred.");
      }
    },
  }),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <StyledEngineProvider enableCssLayer>
        <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
        <App />
      </StyledEngineProvider>
    </QueryClientProvider>
  </StrictMode>
);
