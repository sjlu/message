var config = require('config');
var database = require('./database');
var mongo = require('mongojs');
var Message = require('./message');
var _ = require('lodash');

exports.add = function(message, callback) 
{
	var m = new Message({ message: message });

	var db = database.getInstance().getConnection();
	return db.messages.save(m, function (err, data) 
	{ 
		if (err)
			throw new Error('Issue trying to save to the database. ('+err.code+')');

		return callback(new Message(data));
	});
};

exports.get = function(id, callback)
{
	var _this = this;

	var db = database.getInstance().getConnection();
	return db.messages.findOne({ _id: mongo.ObjectId(id) }, function(err, data) 
	{
		if (err)
			throw new Error('Issue trying to retrieve from the database. ('+err.code+')');

		if (!data)
			throw new Error('Could not find the message.');

		var message = new Message(data);
		return callback(message);
	});
};