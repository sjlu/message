var devices = require('./lib/devices');
var messages = require('./lib/messages');
var db = require('./lib/database');

exports.registerDevice = function(type, key, callback)
{
	db.getInstance();

	var handler = function(device)
	{
		db.destroyInstance();
		return callback({ id: device.getId() });
	};

	try {
		devices.add(type, key, handler);
	} catch (e) {
		callback({ error: e.message });
	}

	return;
};

exports.sendMessage = function(id, message, callback)
{
	var m, d;
	db.getInstance();

	var handler = function()
	{
		if (!m || !d)
			return;

		d.message(m);
		db.destroyInstance();
		callback({ id: m.getId() });
	};

	try {
		messages.add(message, function(e) {
			m = e;
			handler();
		});

		devices.get(id, function(e) {
			d = e;
			handler();
		});
	} catch (e) {
		callback({ error: e.message });
	}

	return;
};

exports.registerDevice('ios', '5dc088a8fc317ff6eb1d765856130cb2b4c3dac4f581dad5a501a6da4cfd40d0', function(e)
{
	console.log('device: '+JSON.stringify(e));
	return exports.sendMessage(e.id, 'test', function(e){
		return console.log('message: '+JSON.stringify(e));
	});
});

