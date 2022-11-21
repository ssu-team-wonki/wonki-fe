import { Routes, Route, BrowserRouter } from "react-router-dom";

import Main from "../pages/Main";
import Login from "../pages/Login";
import { AuthProvider, ProtectedRoute } from "./AuthRouter";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AuthProvider>
                <Main />
              </AuthProvider>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
