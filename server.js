var piping = require('piping')

if (process.env.NODE_ENV === 'production' || piping({hook: true})) {
  require('babel/register')
  var express = require('express')
  var app = express()
  var routes = require('./src/js/server')
  var static = process.env.NODE_ENV === 'development' ? __dirname + '/dev' : __dirname + '/build'

  app.use(express.static(static))

  app.use('/openstates', routes.openStates)

  app.use('/', routes.render)

  app.listen(process.env.PORT || 3000, function() {
    console.log('\nup on port ' + (process.env.PORT || 3000))
  })
}
