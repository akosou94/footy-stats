import { StoreProvider } from "./store/react.tsx";
import { MantineProvider } from "@mantine/core";
import { Matches } from "./components/Matches";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { BrowserRouter, Route, Routes } from "react-router";

const SignIn = () => {
  return <div>SignIn</div>;
};

function App() {
  return (
    <BrowserRouter>
      <MantineProvider>
        <StoreProvider>
          <Routes>
            <Route path="/" element={<Matches />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </StoreProvider>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
