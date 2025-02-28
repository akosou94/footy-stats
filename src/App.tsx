import { StoreProvider } from "./store/react.tsx";
import { MantineProvider } from "@mantine/core";
import { Matches } from "./components/Matches";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

function App() {

	return (
		<MantineProvider>
			<StoreProvider>
				<Matches/>
			</StoreProvider>
		</MantineProvider>
	)
}

export default App
