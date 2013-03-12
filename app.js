var devices = require('./app/devices');
var messages = require('./app/messages');

exports.registerDevice = function(type, key, callback)
{
	var handler = function(device)
	{
		return callback({ id: device.getId() });
	};

	try {
		devices.add(type, key, handler);
	} catch (e) {
		callback({ error: e.message });
	}
};

exports.sendMessage = function(id, message, callback)
{
	var message, device;

	var handler = function()
	{
		if (!message || !device)
			return;

		device.message(message);
		callback({ id: message.getId() });
	};

	try {
		messages.add(message, function(m) {
			message = m;
			handler();
		});

		devices.get(id, function(d) {
			device = d;
			handler();
		});
	} catch (e) {
		callback({ error: e.message });
	}
};

exports.registerDevice('ios', '584EEF6C-3F32-4AFC-B8BA-24D36B38F944', function(e)
{
	console.log(e);
})