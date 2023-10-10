import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Route, Routes } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { DataProvider } from './DataContext';
import routes from './routes';

export async function renderHtml(url: string, data: any): Promise<string | undefined> {

  // check if no route found return undefined
  if (!routes.find(route => route.path === url)) {
    return undefined;
  }

  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <DataProvider initialData={data}>
          <Routes>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element}></Route>
            ))}
          </Routes>
        </DataProvider>
      </StaticRouter>
    </React.StrictMode>
  );
}
