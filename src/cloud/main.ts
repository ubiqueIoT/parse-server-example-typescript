
import testFunctions from './testFunctions'

Parse.Cloud.define('helloworld', testFunctions.helloWorld)
Parse.Cloud.define('throwerror', testFunctions.throwError)
