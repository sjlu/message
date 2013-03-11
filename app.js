var devices = require('./devices');
var messages = require('./messages');

exports.register = function(type, key, callback)
{
	var handler = function(d)
	{
		return callback({ id: d._id });
	};

	try {
		devices.add(type, key, handler);
	} catch(e) {
		callback({error: e.message });
	}
};