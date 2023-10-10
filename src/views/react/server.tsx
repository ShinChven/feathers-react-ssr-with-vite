import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { DataProvider } from './DataContext';
import routes from './routes';

export async function renderHtml(url: string, data: any): Promise<string | undefined> {

  // check if no route found return undefined
  if (!routes.find(route => route.path === url)) {
    return undefined;
  }

  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <DataProvider initialData={data}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </DataProvider>
    </React.StrictMode>
  );
}
