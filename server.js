var piping = require('piping')

if (process.env.NODE_ENV === 'production' || piping({hook: true})) {
  require('babel/register')
  var express = require('express')
  var app = express()
  var routes = require('./src/js/server')

  app.use(express.static(__dirname + '/build'))

  app.use('/openstates', routes.openStates)

  app.listen(process.env.PORT || 3000, function() {
    console.log('\nup on port ' + (process.env.PORT || 3000))
  })
}
