import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import PublicRoute from "./components/PublicRoute";

function App() {

  return (
    <AppProvider i18n={enTranslations}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* ------- Public Route ----------- */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            {/* ------- Protected Route ----------- */}
             <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
