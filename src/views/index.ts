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
        render = (await vite!.ssrLoadModule('/src/views/vite/server.tsx')).renderHtml;
      } else {
        template = fs.readFileSync(path.resolve('index.html'), 'utf-8');
        // @ts-ignore
        render = (await import('/src/views/vite/server.tsx')).renderHtml;
      }
      const appHtml = await render(url);
      if (appHtml !== undefined) {
        const html = template.replace(`<!--app-html-->`, appHtml);
        return res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      }
    } catch (e: any) {
      !isProd && vite?.ssrFixStacktrace(e);
      console.error(e.stack);
    }
    next();
  });
}

