var devices = require('./lib/devices');
// var messages = require('./lib/messages');

exports.registerDevice = function(type, key, callback)
{
	var handler = function(device)
	{
		return callback(device);
	};

	// try {
		devices.create(type, key, handler);
	// } catch (e) {
	// 	callback({ error: e.message });
	// }

	return;
};

exports.sendMessage = function(id, message, callback)
{
	try {
		devices.get(id, function(device) {
			device.send(message);
		});
	} catch (e) {
		callback({ error: e.message });
	}
};

exports.registerDevice('ios', '5dc088a8fc317ff6eb1d765856130cb2b4c3dac4f581dad5a501a6da4cfd40d0', function(e)
{
	console.log('new device: '+JSON.stringify(e));
	exports.sendMessage(e.id, 'test', function(e){
		return console.log('message: '+JSON.stringify(e));
	});
	devices.get(e._id, function(e) {
		// e.type = 'ios';
		e.save(function (err, device) {
			// console.log(err);
		});
		console.log('get device: '+JSON.stringify(e));
	});
});