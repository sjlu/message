var mongoose = require('mongoose');

var schema = mongoose.Schema({
	type: String,
	key: String
});

schema.index({ type: 1, key: 1 }, { unique: true });

module.exports = schema;