import { createTheme, MantineProvider } from "@mantine/core";
import { PropsWithChildren } from "react";

const theme = createTheme({
  fontFamily: "Wix Madefor Display, sans-serif",
  colors: {
    deepRed: [
      "#ff4d6a",
      "#f24763",
      "#e6415c",
      "#d93b55",
      "#cc354e",
      "#bf2f47",
      "#b22940",
      "#a52339",
      "#981d32",
      "#c81d3a",
    ],
  },
});

export const ThemeProvider = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      {children}
    </MantineProvider>
  );
};
