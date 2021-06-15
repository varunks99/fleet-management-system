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

var VehicleSchema = new Schema({
	uid: {
		type: Number,
		index: true
	},
	bitrate: {
		type: Number
	},
	gasTankSize: {
		type: Number
	},
	mrLat: {
		type: Number,
		min: -90,
		max: 90
	},
	mrLong: {
		type: Number,
		min: -180,
		max: 180
	},
	mrSpeed: {
		type: Number
	},
	mrGas: {
		type: Number
	},
	data: [dataSchema]
});


module.exports = mongoose.model('Vehicles', VehicleSchema);

