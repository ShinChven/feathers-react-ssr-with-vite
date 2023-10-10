import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Route, Routes } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import routes from './routes';

// Assuming your routes array is structured something like this:

export async function renderHtml(url: string) {

  // check if no route found return undefined
  if (!routes.find(route => route.path === url)) {
    return undefined;
  }

  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url} >
        <Routes>
          {routes.map(({ path, element }) => {
            return <Route key={path} path={path} element={element}></Route>
          })}
        </Routes>
      </StaticRouter>
    </React.StrictMode>
  );
  return html;
}
