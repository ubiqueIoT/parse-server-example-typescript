// @ts-expect-error
import { ParseServer } from 'parse-server'
import dotenv from 'dotenv'
import http from 'http'
import express from 'express'
import { schemas } from './schemas'

dotenv.config()

console.log(process.env.MASTER_KEY)
// const localDebug = process.env.LOCAL_DEBUG !== undefined
const databaseURI = process.env.DATABASE_URI === undefined ? 'http://localhost:1207' : process.env.DATABASE_URI
const appId = process.env.APP_ID === undefined ? 'appId' : process.env.APP_ID
const masterKey = process.env.MASTER_KEY === undefined ? 'masterKey' : process.env.MASTER_KEY
const serverURL = process.env.SERVER_URL === undefined ? 'http://localhost:1337/parse' : process.env.SERVER_URL
const cloud = process.env.CLOUD_CODE_MAIN === undefined ? './src/cloud/main.js' : process.env.CLOUD_CODE_MAIN

const port = process.env.PORT === undefined ? 1337 : process.env.PORT
const mountPath = process.env.PARSE_MOUNT === undefined ? '/parse' : process.env.PARSE_MOUNT

const api = new ParseServer({
  databaseURI,
  cloud,
  appId,
  masterKey,
  serverURL,
  schema: {
    strict: true,
    definitions: schemas
  }
})
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

const app = express()
app.use(mountPath, api)

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req: any, res: any) {
  res.status(200).send('Parse Server running with Typescript!')
})

const httpServer = http.createServer(app)
httpServer.listen(port, function () {
  console.log(`parse-server-example running on port${port}.`)
})
// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer)
