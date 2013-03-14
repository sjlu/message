var config = require('config');
var _ = require('lodash');
var mongoose = require('mongoose');
mongoose.connect(config.mongo);

// This require function abstracts what type
// of devices we have in the ./devices folder.
// and imports is abstractly.
exports.methods = function(type)
{
	var methods;

	try {
		methods = require('./devices/'+type.toLowerCase().trim());
	} catch (e) {
		throw new Error('No such device type exists. ('+type+')');
	}

	return methods;
};

exports.model = function(type)
{
	var schema = require('./schema/device.js');
	
	if (type)
		schema.methods = this.methods(type);

	Device = mongoose.model('Device', schema);

	return Device;
};

// Lets create a new device!
exports.create = function(type, key, callback) 
{
	var Device = this.model(type);

	// Create a new device.
	var device = new Device({
		key: key,
		type: type
	});

	// Save that device to the database.
	device.save(function (err, device) 
	{ 
		if (err)
		{
			if (err.code == 11000)
			{
				return Device.findOne({ key: key, type: type }, function(err, device) 
				{
					if (err || !device)
						throw new Error('Something wrong happened to the database.');

					callback(device);
				});
			}
		}

		return callback(device);
	});
};

// Lets get a device!
exports.get = function(id, callback)
{
	var _this = this;

	// This is an empty device, we'll grab the
	// appropriate model accordingly later.
	var Device = this.model();

	Device.findById(id, function(err, device) 
	{
		if (err)
			throw new Error('Problem trying to find the device.');

		if (!device)
			throw new Error('Device could not be found.');

		Device.findById(id, function(err, device) {
			callback(device);
		});
	});
};