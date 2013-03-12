var mongo = require('mongojs');
var db = mongo('mongodb://localhost/message');
var Message = require('./message');
var messages = db.collection('messages');
var _ = require('lodash');

exports.add = function(message, callback) 
{
	var message = new Message({ message: message });

	return messages.save(message.format(), function (err, data) 
	{ 
		if (err)
			throw new Error('Issue trying to save to the database. ('+err.code+')');

		return callback(_.assign(message, { _id: data._id }));
	});
};

exports.get = function(id, callback)
{
	var _this = this;

	devices.findOne({ _id: mongo.ObjectId(id) }, function(err, data) 
	{
		if (err)
			throw new Error('Issue trying to retrieve from the database. ('+err.code+')');

		if (!data)
			throw new Error('Could not find the message.');

		var message = new Message(data);
		return callback(message);
	});
};
