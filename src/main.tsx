import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import App from "./App.tsx";
import { ThemeProvider } from "./providers/ThemeProvider";
import { StoreProvider } from "./store/react.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
