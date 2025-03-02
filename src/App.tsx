import { StoreProvider } from "./store/react.tsx";
import { Matches } from "./components/Matches";
import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "./providers/ThemeProvider";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

const SignIn = () => {
  return <div>SignIn</div>;
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <StoreProvider>
          <Routes>
            <Route path="/" element={<Matches />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </StoreProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
