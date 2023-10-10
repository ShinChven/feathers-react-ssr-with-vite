# Feathers React SSR with Vite

> FeathersJS app renders React SSR with Vite.

## About

This project is a template and a demo for a FeathersJS app integrate a vite React SSR render.

FeathersJS is a NodeJS framework for building RESTful APIs, real-time applications, and modern microservices. It is built on top of ExpressJS and Socket.io.

## Features

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```bash
    npm install
    ```
    - `public` folder and `src/ssr` folder will be created once `postinstall` script is executed.
    - You can also build them manually by running `npm run build:client` and `npm run build:server` respectively, or just run `npm run build` to build both.

3. Start your app

    ```bash
    npm run build && npm run compile # This only needs to be run once
    npm start
    ```
    - This will start the FeatherJS server in production mode.

4. Run the app in development mode:
   
    ```bash
    npm run build # This only needs to be run once
    npm run dev
    ```
    - NodeJS hot reload is enabled.
    - Vite `hmr` is enabled, see it in [src/views/react/index.ts](/src/views/react/index.ts).

## FeathersJS Project Configured

Based on a standard FeathersJS template, this project has been configured to support: 
- ESM
- JavaScript
- JSX

See details in [/tsconfig.json](/tsconfig.json).

```json5
{
  "compilerOptions": {
    "module": "NodeNext",                   // ESM
    "moduleResolution": "NodeNext",         // ESM
    "allowJs": true,                        // Use JavaScript React SSR render code in production
    "jsx": "react-jsx"                     // Use JSX
  },
}
```

## Vite React SSR Configured

`vite` serves as the React bundler and DevServer in this project, it can only be imported through dynamic import, see it in [src/views/index.ts](/src/views/index.ts).

`react`, `react-dom`, `react-router-dom` and `vite` were installed as dependencies, `@vitejs/plugin-react` was installed as devDependencies. Please see them in [package.json](/package.json).

- `index.html` is the template for Vite.
- `src/views` folder contains the react code.
- `src/views/public` folder contains the static files for development, it will be build to `public`, `DO NOT` place anything in `public`, for all will be removed once rebuilt.
- `src/views/index.ts` setup a vite DevServer and a vite SSR render.
- `src/views/react/server.tsx` is the entry point for vite SSR render, it will be built to `src/ssr/server.mjs` to be used in production mode.
- `src/views/react/client.tsx` is the entry point for vite CSR hydration, it was referenced in `index.html`.

## Feathers Scaffolding

This app comes with a powerful command line interface for Feathers. Here are a few things it can do:

```
$ npx feathers help                           # Show all commands
$ npx feathers generate service               # Generate a new Service
```


