import { NextUIProvider } from '@nextui-org/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import Router from './routers';
import reportWebVitals from './reportWebVitals';

import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { AuthProvider } from './Providers/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <NextUIProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </NextUIProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
