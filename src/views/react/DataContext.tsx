import React, { createContext, useContext, ReactNode } from 'react';

// Define the shape of your data, here it's any, but you should replace it with your data's type
interface DataShape {
  // define your data shape here, for example:
  // key: string;
  // value: number;
}

// Create a new context with `createContext`.
// The argument to `createContext` is the default value.
const DataContext = createContext<DataShape | null>(null);

interface DataProviderProps {
  initialData: DataShape;
  children: ReactNode;
}

// Create a provider component that will take `initialData` and `children` as props.
// `children` is whatever components are nested inside the `DataProvider`.
export const DataProvider: React.FC<DataProviderProps> = ({ initialData, children }) => (
  <DataContext.Provider value={initialData}>
    {children}
  </DataContext.Provider>
);

// Create a custom hook to provide a shorthand for accessing the current value of the context.
export const useData = () => useContext(DataContext);

// Exporting DataContext is optional, but could be useful if you ever need to use it directly.
export default DataContext;
