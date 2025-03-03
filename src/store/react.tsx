import { createContext, FC, PropsWithChildren, useState } from "react";
import { useNavigate } from "react-router";
import { RootStore } from "./rootStore.ts";

const mockedNavigate = () => {};

export const StoreContext = createContext<RootStore>(
  new RootStore(mockedNavigate),
);

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  const [rootStore] = useState(() => new RootStore(navigate));

  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};
