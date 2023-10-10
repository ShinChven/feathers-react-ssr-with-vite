// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import configuration from '@feathersjs/configuration'
import express, {
  cors,
  errorHandler,
  json,
  notFound,
  rest,
  serveStatic,
  urlencoded
} from '@feathersjs/express'
import { feathers } from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio'

import type { Application } from './declarations'

import { channels } from './channels'
import { logError } from './hooks/log-error'
import { logger } from './logger'
import { services } from './services/index'
import { viteSSRMiddleware } from './views/index'

const app: Application = express(feathers())

async function createServer() {
  app.configure(configuration())
  app.use(cors())
  app.use(json())
  app.use(urlencoded({ extended: true }))

  await viteSSRMiddleware(app);

  // Host the public folder
  app.use('/', serveStatic(app.get('public')))

  // Configure services and real-time functionality
  app.configure(rest())
  app.configure(
    socketio({
      cors: {
        origin: app.get('origins')
      }
    })
  )
  app.configure(services)
  app.configure(channels)

  // Configure a middleware for 404s and the error handler
  app.use(notFound())
  app.use(errorHandler({ logger }))

  // Register hooks that run on all service methods
  app.hooks({
    around: {
      all: [logError]
    },
    before: {},
    after: {},
    error: {}
  })
  // Register application setup and teardown hooks here
  app.hooks({
    setup: [],
    teardown: []
  })


  const port = app.get('port')
  const host = app.get('host')

  process.on('unhandledRejection', (reason) => logger.error('Unhandled Rejection %O', reason))

  app.listen(port).then(() => {
    logger.info(`Feathers app listening on http://${host}:${port}`)
  })
}

createServer();




