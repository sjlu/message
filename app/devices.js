var mongo = require('mongojs');
var db = mongo('mongodb://localhost/message');
var devices = db.collection('devices');

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
	} catch (e)
	{
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
	var device = new Device(key);

	// Do a database insert.
	return devices.save(device.format(), function (err, data) { 
		if (err)
		{
			if (err.code == 11000) // this is duplicate row found error
			{
				return devices.findOne(device.format(), function (err, data) {
					return callback({ id: data._id, device: device });
				});
			}
			else
				throw new Error('Issue trying to save to the database. ('+err.code+')');
		}

		return callback({ id: data._id, device: device });
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
		var device = new Device(data.key);

		return callback({ id: data._id, device: device });
	});
};

// exports.get('513e515e213ef90000000001', function(d) {
// 	console.log(d);
// });