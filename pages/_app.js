import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { SessionProvider } from "next-auth/react";

import "@fontsource/rubik/variable.css";

export default function App(props) {
  const { Component, pageProps, session } = props;
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <SessionProvider session={session}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            colorScheme,
            fontFamily: "RubikVariable",
            headings: { fontFamily: "RubikVariable" },
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Component {...pageProps} />
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  );
}
