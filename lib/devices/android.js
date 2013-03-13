var _ = require('lodash');

module.exports = (function()
{

	function Android(opts)
	{
		var _this = this;
		_.each(
			_.defaults(opts, {
				'type': 'android'
			}),
			function(value, key)
			{
				_this[key] = value;
			}
		);

		if (!this.opts.key)
			throw new Error('A key is required to create an Android device.');
	}

	Android.prototype.getId = function()
	{
		return this.opts._id;
	};

	Android.prototype.format = function()
	{
		return this.opts;
	};

	return Android;

})();