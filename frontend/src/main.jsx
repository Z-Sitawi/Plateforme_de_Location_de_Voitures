import "./styles/index.css";

import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./config/store";

/* Components */
import User from "./components/User.jsx";
import Admin from "./components/Admin.jsx";
import App from "./App.jsx";
import AuthPage from "./components/AuthPage.jsx";
import Home from "./components/Home.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route path="/govroom/:action" element={<AuthPage />} />
          <Route path="/accueil" element={<Home />} />
          <Route path="/accueil/user" element={<User />} />
          <Route path="/accueil/admin" element={<Admin />} />

          {/* Wrong Path */}
          <Route path="*" element={<div className="display-1 text-center mt-5">Page Non Trouvée</div>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
