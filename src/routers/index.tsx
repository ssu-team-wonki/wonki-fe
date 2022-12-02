import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Calendar from '../pages/Main';
import Register from '../pages/Register';
import Login from '../pages/Login';

import { ProtectedAuthRoute } from './AuthRouter';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedAuthRoute>
              <Calendar />
            </ProtectedAuthRoute>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
