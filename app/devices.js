var mongo = require('mongojs');
var db = mongo('mongodb://localhost/message');
var devices = db.collection('devices');
var _ = require('lodash');

// mongo db related things.
devices.ensureIndex({type: 1, key: 1}, {unique: true});

// This require function abstracts what type
// of devices we have in the ./devices folder.
// and imports is abstractly.
exports.require = function(type)
{
	var Device;

	try {
		Device = require('./devices/'+type.toLowerCase().trim());
	} catch (e) {
		throw new Error('No such device type exists. ('+type+')');
	}

	return Device;
};

// Adding a device based on the type and key, pretty self
// explanitory. It will return a "Device" object, allowing
// us to call functions upon that device.
exports.add = function(type, key, callback) 
{
	var Device = this.require(type);

	// generate a new device
	var device = new Device({key: key});

	// Do a database insert.
	return devices.save(_.clone(device), function (err, data) 
	{ 
		if (err)
		{
			if (err.code == 11000) // this is duplicate row found error
			{
				return devices.findOne(device, function (err, data) {
					return callback(new Device(data));
				});
			}
			else
				throw new Error('Issue trying to save to the database. ('+err.code+')');
		}

		// return callback(_.assign(device, { _id: data._id }));
		return callback(new Device(data));
	});
};

// This get function will return us a "device" based on
// the database ID we give it.
exports.get = function(id, callback)
{
	var _this = this;

	devices.findOne({ _id: mongo.ObjectId(id) }, function(err, data) 
	{
		if (err)
			throw new Error('Issue trying to retrieve from the database. ('+err.code+')');

		if (!data)
			throw new Error('Could not find the device.');

		var Device = _this.require(data.type);
		var device = new Device(data);

		return callback(device);
	});
};

// exports.get('513ecc541898add61a000001', function(e){
// 	console.log(e);
// })
