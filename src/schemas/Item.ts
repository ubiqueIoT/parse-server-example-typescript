import { SchemaMigrations } from 'parse-server'

export default SchemaMigrations.makeSchema('Item', {
  fields: {
    createdBy: { type: 'Pointer', targetClass: '_User' },
    name: { type: 'String' },
    size: { type: 'Number' },
    released: { type: 'Boolean' }
  },
  indexes: {
    name: { name: 1 }
  },
  classLevelPermissions: {
    ...SchemaMigrations.CLP.allow({
      requiresAuthentication: ['find', 'get', 'count', 'update', 'create', 'delete']
    }),
    protectedFields: {
      // '*': [
      //     'symbol',
      // ],
    }
  }
})
