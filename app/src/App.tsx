import {ThemeSettings} from "./theme/Theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {RouterProvider} from "react-router-dom";
import router from "./routes";
import "./App.css";

function App() {
  const theme = ThemeSettings();

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <RouterProvider router={router}/>
      </ThemeProvider>
  );
}

export default App;