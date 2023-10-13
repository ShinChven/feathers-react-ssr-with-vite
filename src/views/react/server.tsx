import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Helmet, HelmetData } from 'react-helmet';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { DataProvider } from './context';
import routes from './routes';

export async function renderHtml(url: string, data: any): Promise<{ appHtml: string, helmet: HelmetData } | undefined> {
  // check if no route found return undefined
  if (!routes.find(route => route.path === url)) {
    return undefined;
  }

  const appHtml = ReactDOMServer.renderToString(
    <React.StrictMode>
      <DataProvider initialData={data}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </DataProvider>
    </React.StrictMode>
  );

  const helmet = Helmet.renderStatic();
  return { appHtml, helmet };
}
