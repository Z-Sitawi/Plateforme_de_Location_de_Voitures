import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage.jsx";
import Home from "./components/Home.jsx";
import { Provider } from "react-redux";
import { store } from "./config/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact element={<App />} path="/" />
          <Route element={<AuthPage />} path="/govroom/:action" />
          <Route element={<Home />} path="/accueil" />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
