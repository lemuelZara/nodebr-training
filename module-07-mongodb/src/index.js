const ContextStrategy = require('./database/strategies/base/contextStrategy')
const MongoDB = require('./database/strategies/mongodb')
const PostgreSQL = require('./database/strategies/postgresql')

const mongodbContext = new ContextStrategy(new MongoDB())
mongodbContext.create()

const postgresContext = new ContextStrategy(new PostgreSQL())
postgresContext.create()