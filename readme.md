# Feathers React SSR with Vite

> FeathersJS app renders React SSR with Vite.

## About

This project is a template and a demo for a FeathersJS app that integrates Vite for React SSR rendering.

FeathersJS is a NodeJS framework for building RESTful APIs, real-time applications, and modern microservices. It is built on top of ExpressJS and Socket.io.

## Features

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```bash
    npm install
    ```
    - The `public` and `src/ssr` folders will be created once the `postinstall` script is executed.
    - You can also build them manually by running `npm run build:client` and `npm run build:server` respectively, or just run `npm run build` to build both.

3. Start your app

    ```bash
    npm run build && npm run compile # This only needs to be run once
    npm start
    ```
    - This will start the FeathersJS server in production mode.

4. Run the app in development mode:
   
    ```bash
    npm run build # This only needs to be run once
    npm run dev
    ```
    - NodeJS hot reload is enabled.
    - Vite's `hmr` is enabled. See it in [src/views/react/index.ts](/src/views/react/index.ts).

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
    "jsx": "react-jsx"                      // Use JSX
  },
}
```

## Vite React SSR Configured

`vite` serves as the React bundler and DevServer in this project. It can only be imported through dynamic imports. See it in [src/views/index.ts](/src/views/index.ts).

### Dependencies and devDependencies added:
    
```bash
npm install react react-dom react-router-dom vite --save
npm install @types/react @types/react-dom @types/react-router-dom @vitejs/plugin-react --save-dev
```

### Code Structure Explained:

- `index.html` is the template for Vite.
- The `src/views` folder contains the react code.
- The `src/views/public` folder contains static files for development. These will be built into the `public` directory. `DO NOT` place anything directly in `public` as its contents will be removed upon rebuilding.
- `src/views/index.ts` sets up a Vite DevServer and a Vite SSR render.
- `src/views/react/server.tsx` is the entry point for the Vite SSR render. It will be built to `src/ssr/server.mjs` for use in production mode.
- `src/views/react/client.tsx` is the entry point for Vite CSR hydration and is referenced in `index.html`.

## React SSR with Data Context

The `DataContext` is a React Context that I use it to store the SSR `initial data`. It is defined in [src/views/react/context.tsx](/src/views/react/context.tsx).

When the App component is wrappred with the `DataContext`, the `initial data` can be accessed in any component through the `useData` hook in `context.tsx`.

And the `initial data` is passed to the client side by replacing the `window.__INITIAL_DATA__` placeholder in [src/views/react/server.tsx](/src/views/react/server.tsx). Please see the [index.html](/index.html) for details about how it is used.

### CSS Module Enabled

Vite has [built-in support for CSS Modules](https://vitejs.dev/guide/features.html#css-modules), but you have to install the preprocessors on your own:

```bash
npm install less less-loader --save-dev
```

To enable it, you need to add the following configuration to [vite.config.ts](/vite.config.ts):

```ts
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        math: "always",
        relativeUrls: true,
        javascriptEnabled: true
      },
    },
  }
})
```

To use LESS module in your component, you need to:

- Create a LESS file like `index.module.less`. You must use the `.module.less` extension.

- Use it in your component like this:

    ```tsx
    import styles from './index.module.less'

    export default function Component() {
      return <div className={styles.container}>Hello World</div>
    }
    ```

## Feathers Scaffolding

This app includes a powerful command-line interface for Feathers. Here are some of the available commands:

```
$ npx feathers help                           # Show all commands
$ npx feathers generate service               # Generate a new Service
```