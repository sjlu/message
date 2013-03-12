var apns = require('apn');
var messages = require('../messages');
// var message = require('../message');
var _ = require('lodash');

module.exports = (function()
{

	function iOS(opts)
	{
		var _this = this;
		_.each(
			_.defaults(opts, {
				'type': 'ios'
			}),
			function(value, key)
			{
				_this[key] = value;
			}
		);

		if (!this.key)
			throw new Error('A key is required to create an iOS device.');
	}

	iOS.prototype.getId = function()
	{
		return this._id;
	}

	iOS.prototype.message = function(message)
	{
		if (typeof message != 'object' || typeof message.getMessage != 'function')
			throw new Error('Requires a message object to be passed.');

		var callback = function(err)
		{
			throw new Error('There was a problem sending the notification');
		};

		var config = {
			cert: '',
			key: '',
			ca: '',
			gateway: 'gateway.push.apple.com',
			port: 2195,
			enhanced: true,
			// errorCallback: callback
		};

		var connection = new apns.Connection(config);
		var device = new apns.Device(this.key);
		var notification = new apns.Notification();

		notification.expiry = Math.floor(Date.now() / 1000) + 21600; // 6 hours
		// message.badge = 0;
		// message.sound = '';
		notification.alert = message.getMessage();
		notification.payload = {};

		notification.device = device;
		notification.errorCallback = callback;

		connection.sendNotification(notification);

		return;
	};

	return iOS;

})();