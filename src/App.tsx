import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import IndexPage from "./pages/Index";

const theme = createTheme({
  primaryColor: "blue"
});

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <IndexPage />
    </MantineProvider>
  );
}

export default App;
