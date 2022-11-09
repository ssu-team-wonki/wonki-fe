import { Routes, Route, BrowserRouter } from "react-router-dom";
import Calendar from "./pages/Calendar";
import Login from "./pages/Login";

import Main from "./pages/Main";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="calendar" element={<Calendar />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
