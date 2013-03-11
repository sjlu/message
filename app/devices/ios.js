var apns = require('apn');

module.exports = (function()
{

	function iOS(key)
	{
		if (!key)
			throw new Error('A key is required to create an iOS device.');

		this.key = key;
		this.type = 'ios';
	}

	iOS.prototype.format = function()
	{
		return { type: this.type, key: this.key };
	};

	return iOS;

})();