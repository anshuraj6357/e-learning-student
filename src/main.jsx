import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Provider } from "react-redux";
import { appStore } from "./store/store";  // Adjust path if needed
import { Toaster } from 'react-hot-toast';

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={appStore}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <App />
        <Toaster />  {/* Usually placed inside but outside App or inside App depending on library */}
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
