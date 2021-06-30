const Manager = require('../models/managerModel');
const bcrypt = require('bcryptjs');



exports.create = function (req, res) {
	var newManager = new Manager({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	});
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(newManager.password, salt, function (err, hash) {
			newManager.password = hash;
			newManager.save(function (err, manager) {
				res.setHeader('Access-Control-Allow-Origin', '*');
				if (err)
					res.send(error);
				res.json(manager);
			});
		});
	});
};

exports.deleteByUsername = function (req, res) {
	Manager.remove({ username: req.params.username }, function (err, manager) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		if (err)
			res.send(err)
		res.json(manager);
	});
};

exports.listAll = function (req, res) {
	Manager.find({}, function (err, ex) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		if (err)
			res.send(err)
		res.json(ex);
	});
};

exports.getManagerByUsername = function (username, callback) {
	var query = { username: username };
	User.findOne(query, callback);
};


exports.comparePassword = function (req, res) {
	Manager.findOne({ username: req.body.username }, function (err, managerv) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		if (err)
			res.send(err);
		bcrypt.compare(req.body.password, managerv.password, function (err, isMatch) {
			if (err) throw err;
			if (isMatch) {
				res.json({ Validated: true });
			}
			else {
				res.json({ Validated: false });
			}

		});
	});

};

exports.updateVehicles = function (req, res) {
	Manager.updateOne({ username: req.params.username }, { $push: { "vehicles": req.body.uid } }, { safe: true, upsert: true }, function (err, manager) {
		if (err)
			res.send(err);

		Manager.findOne({ username: req.params.username }, function (err, managerv) {
			res.setHeader('Access-Control-Allow-Origin', '*');
			if (err)
				res.send(err);
			res.json(managerv.vehicles);
		});
	});
};

exports.getVehicles = function (req, res) {
	Manager.findOne({ username: req.params.username }, function (err, manager) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		if (err)
			res.send(err);
		res.json(manager.vehicles);
	});
};
