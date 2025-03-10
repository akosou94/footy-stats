import { Matches } from "./components/Matches";
import { Route, Routes } from "react-router";

import { useAppStore } from "./store/hooks.ts";
import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ROUTES } from "./api/routing.constants.ts";
import SignIn from "./components/SignIn/SignIn";
import { Loader } from "@mantine/core";

const App: FC = observer(() => {
  const appStore = useAppStore();

  useEffect(() => {
    appStore.init();
  }, [appStore]);

  if (!appStore.isReady) {
    return <Loader color="deepRed.9" />;
  }

  return (
    <Routes>
      <Route path={ROUTES.home} element={<Matches />} />
      <Route path={ROUTES.signIn} element={<SignIn />} />
    </Routes>
  );
});

export default App;
