
/* eslint @typescript-eslint/no-throw-literal: "off" */

import { Cloud } from 'parse'

const helloWorld = (request: Cloud.FunctionRequest): string => {
  return 'Hello world'
}

const throwError = (request: Cloud.FunctionRequest): void => {
  throw new Parse.Error(Parse.Error.INVALID_QUERY, 'Testing out Parse Errors')
}

export default {
  helloWorld,
  throwError
}
