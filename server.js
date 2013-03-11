var message = require('./app');
var express = require('express');
var app = express();

app.use(express.bodyParser());

app.post('/register', function (req, res) 
{
	var handler = function(d)
	{
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(d));
	};

	var type = req.body.type,
		key = req.body.key;

	message.register(type, key, handler);
});

app.listen(4000);
console.log('http://localhost:4000');