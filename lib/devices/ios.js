var config = require('config').ios;
var apns = require('apn');
var _ = require('lodash');

var methods = {};

methods.send = function(message, callback)
{
	if (!message)
		throw new Error('Requires a message object to be passed.');

	var errorHandler = function(err, message)
	{
		if (code == 'ECONNRESET')
			return;

		throw new Error('There was a problem sending the notification.');
	};

	var opts = {
		cert: config.cert,
		key: config.key,
		// ca: config.ca,
		gateway: 'gateway.push.apple.com',
		port: 2195,
		enhanced: true,
		errorCallback: errorHandler
	};

	var connection = new apns.Connection(opts);
	var device = new apns.Device(this.key);
	var notification = new apns.Notification();

	notification.expiry = Math.floor(Date.now() / 1000) + 21600; // 6 hours
	// message.badge = 0;
	// message.sound = '';
	notification.alert = message;
	notification.payload = {};

	notification.device = device;
	notification.errorCallback = errorHandler;

	connection.sendNotification(notification);
	connection.destroyConnection();

	return;
};

module.exports = methods;