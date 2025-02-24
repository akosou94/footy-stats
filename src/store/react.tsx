import { createContext, FC, PropsWithChildren, useState } from "react";
import { RootStore } from "./rootStore.ts";

export const StoreContext = createContext<RootStore>(new RootStore())


export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {

	const [rootStore] = useState(() => new RootStore())

	return <StoreContext.Provider value={rootStore}>
		{children}
	</StoreContext.Provider>
}