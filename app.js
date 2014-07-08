
/**
 * Module dependencies.
 */

var 

//module
express = require('express')

//user setting
,port = 7654

// all environments
,app = express()

//view engine
app.set('view engine', 'jade')

//route
app.get('/', function(req, res) {
	res.render('index')
})

//statics
app.use(express.static(__dirname + '/public'))

app.listen(port, function() {
	console.log('Magic happens on port ' + port)
})
