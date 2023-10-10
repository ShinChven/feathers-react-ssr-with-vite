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
    npm start
    ```
    - This will start the FeatherJS server in production mode.

4. Run the app in development mode:
   
    ```bash
    npm run dev
    ```
    - NodeJS hot reload is enabled.
    - Vite `hmr` is enabled, see it in [src/views/vite/index.ts](/src/views/vite/index.ts).

## FeathersJS Project Configured

Based on a standard FeathersJS template, this project has been configured to support: 
- ESM
- JavaScript
- Dynamic import
- JSX

See details in [/tsconfig.json](/tsconfig.json).

```json5
{
  "compilerOptions": {
    "module": "NodeNext",                   // ESM
    "moduleResolution": "NodeNext",         // ESM
    "allowJs": true,                        // Use JavaScript React SSR render code
    "jsx": "react-jsx",                     // Use JSX
    "allowImportingTsExtensions": true,     // Dynamic import
    "noEmit": true,                         // No emit for Dynamic import
  },
}
```


   
## Feathers Scaffolding

This app comes with a powerful command line interface for Feathers. Here are a few things it can do:

```
$ npx feathers help                           # Show all commands
$ npx feathers generate service               # Generate a new Service
```


