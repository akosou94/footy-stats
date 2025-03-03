import { useContext } from "react";
import { StoreContext } from "./react.tsx";

export const useStore = () => {
  return useContext(StoreContext);
};

export const useMatchesStore = () => {
  return useStore().matchesStore;
};

export const useAppStore = () => {
  return useStore().appStore;
};
