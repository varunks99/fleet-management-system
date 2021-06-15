var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new Schema({
	date: {
		type: Date,
		default: Date.now
	},
	speed: {
		type: Number
	},
	gas: {
	type: Number
	},
	longitude: {
		type: Number,
		min: -180,
		max: 180
	},
	latitude: {
		type: Number,
		min: -90,
		max: 90
	}
});
var ExampleSchema = new Schema({
	uid: {
		type: Number,
		index: true
	},
	data: [dataSchema]
	
});

module.exports = mongoose.model('Examples', ExampleSchema);

	