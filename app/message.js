var _ = require('lodash');

module.exports = (function()
{

	function Message(opts)
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

		if (!this.message)
			throw new Error('A message is required to create a new Message.');
	}

	Message.prototype.getId = function()
	{
		return this._id;
	}

	Message.prototype.getMessage = function()
	{
		return this.message;
	}

	return Message;

})();