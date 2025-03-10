import { Route, Routes } from "react-router";
import { Matches } from "./components/Matches";

import { Loader } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { ROUTES } from "./api/routing.constants.ts";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import { useAppStore } from "./store/hooks.ts";
import Layout from "./components/Layout/Layout.tsx";

const App: FC = observer(() => {
  const appStore = useAppStore();

  useEffect(() => {
    appStore.init();
  }, [appStore]);

  if (!appStore.isReady) {
    return <Loader color="deepRed.9" />;
  }

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.home} element={<Matches />} />
        </Route>
        <Route path={ROUTES.signIn} element={<SignIn />} />
        <Route path={ROUTES.signUp} element={<SignUp />} />
      </Routes>
    </>
  );
});

export default App;
