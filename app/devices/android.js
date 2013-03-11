var apns = require('apn');

module.exports = (function()
{

	function Android(key)
	{
		if (!key)
			throw new Error('A key is required to create an Android device.');

		this.key = key;
		this.type = 'android';
	}

	Android.prototype.format = function()
	{
		return { type: this.type, key: this.key };
	};

	return Android;

})();