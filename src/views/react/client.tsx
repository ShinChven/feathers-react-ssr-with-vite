import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import routes from "./routes";
import { DataProvider } from './DataContext';  // Import DataProvider

const router = createBrowserRouter(routes);
const initialData = window.__INITIAL_DATA__;  // Access the serialized data

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <DataProvider initialData={initialData}>  {/* Wrap RouterProvider with DataProvider */}
      <RouterProvider router={router} />
    </DataProvider>
  </React.StrictMode>
);
