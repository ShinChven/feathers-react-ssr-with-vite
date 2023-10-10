import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter
} from "react-router-dom";
import App from './App';
import { DataProvider } from './context'; // Import DataProvider

const initialData = window.__INITIAL_DATA__;  // Access the serialized data

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <DataProvider initialData={initialData}>  {/* Wrap RouterProvider with DataProvider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataProvider>
  </React.StrictMode>
);
