var util = require("util");
var config = require('config');
var mongo = require("mongojs");
var instance;

var Database = (function()
{

	function Database()
	{
		this.connection = mongo.connect(config.mongo, ['devices', 'messages']);
	}

	Database.prototype.getConnection = function()
	{
		return this.connection;
	};

	return Database;

})();

module.exports.getInstance = function()
{
	return instance || (instance = new Database());
};

module.exports.destroyInstance = function()
{
	instance.getConnection().close();
	instance = null;
}