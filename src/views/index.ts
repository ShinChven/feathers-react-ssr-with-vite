import { Application } from '@feathersjs/express';
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export async function viteSSRMiddleware(app: Application) {

  const isProd = process.env.NODE_ENV === 'production';
  const root = process.cwd();

  async function createViteServer() {
    let vite: any | undefined;
    if (!isProd) {
      const { createServer } = await import('vite');
      vite = await createServer({
        root,
        logLevel: 'info',
        server: {
          middlewareMode: true,
          watch: {
            usePolling: true,
            interval: 100,
          },
          hmr: {
          },
          // ...other Vite server config as needed
        },
        appType: 'custom',
      });
      app.use(vite.middlewares);
    }
    return vite;
  }

  const vite = await createViteServer();

  app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const url = req.originalUrl;
      let template, render;
      if (!isProd) {
        template = fs.readFileSync(path.resolve('index.html'), 'utf-8');
        template = await vite!.transformIndexHtml(url, template);
        render = (await vite!.ssrLoadModule('/src/views/react/server.tsx')).renderHtml;
      } else {
        template = fs.readFileSync(path.resolve('public/index.html'), 'utf-8');
        render = (await import('../ssr/server.mjs')).renderHtml;
      }
      const data = {
        title: 'hello vite ssr',
        url,
      }
      const appHtml = await render(url, data);
      const script = `<script>window.__INITIAL_DATA__ = ${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
      if (appHtml !== undefined) {
        const html = template.replace(`<!--app-html-->`, appHtml).replace(`<!--initial-data-->`, script);
        return res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      }
    } catch (e: any) {
      !isProd && vite?.ssrFixStacktrace(e);
      console.error(e.stack);
    }
    next();
  });
}

