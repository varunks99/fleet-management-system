const Vehicle = require('../models/vehicleModel'),
	Manager = require('../models/managerModel');

exports.listAll = function (req, res) {
	Vehicle.find({}, function (err, vehicle) {
		if (err)
			return res.send(err)
		res.json(vehicle);
	});
};

exports.create = function (req, res) {
	Vehicle.findOne({ uid: req.body.uid }, function (err, vehicle) {
		if (err)
			return res.send(err);
		if (!vehicle) {
			result = new Vehicle(req.body);
			result.save(function (err, vehiclen) {

				if (err)
					res.send(err);
				res.json(vehiclen);
			});
		}
	});

};

exports.getByUid = function (req, res) {
	Vehicle.findOne({ uid: req.params.uid }, function (err, vehicle) {
		if (err)
			return res.send(err);
		res.json(vehicle);
	});
};

exports.updateVehicle = function (req, res) {
	Vehicle.findOneAndUpdate({ uid: req.params.uid }, { $push: { "data": req.body }, $set: { "mrLat": req.body.latitude, "mrLong": req.body.longitude, "mrSpeed": req.body.speed, "mrGas": req.body.gas } }, { safe: true, upsert: true }, function (err, vehicle) {
		if (err)
			return res.send(err)
		if (vehicle)
			Vehicle.findOne({ uid: vehicle.uid }, function (err, vehicleu) {
				if (err)
					res.send(err);
				res.json(vehicleu);
			});
		else
			res.sendStatus(404)
	});
};

exports.deleteByUid = function (req, res) {
	Vehicle.deleteOne({ uid: req.params.uid }, function (err, vehicle) {
		if (err)
			return res.send(err);
		Manager.updateOne(
			{ vehicles: req.params.uid },
			{ $pull: { vehicles: req.params.uid } },
			{ multi: true },
			(err) => {
				if (err)
					return res.send(err);
				res.json(vehicle);
			}
		)
	});
};
