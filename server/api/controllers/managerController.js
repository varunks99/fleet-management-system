const Manager = require('../models/managerModel');
const bcrypt = require('bcryptjs');

exports.create = function (req, res) {
	Manager.findOne({ username: req.body.username }, 'username', (err, manager) => {
		if (err)
			return res.status(500).send({ flag: 'fail', message: 'An error occurred. Please try again.' });

		if (manager) {
			res.json({ flag: 'fail', message: 'This username already exists! Please select another' });
		} else {
			let newManager = new Manager({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password
			});
			bcrypt.genSalt(10, function (err, salt) {
				bcrypt.hash(newManager.password, salt, function (err, hash) {
					newManager.password = hash;
					newManager.save(function (err, manager) {
						if (err)
							return res.status(500).send({ flag: 'fail', message: 'An error occurred. Please try again.' });
						res.status(201).json({ flag: 'success', message: 'User successfully registered' });
					});
				});
			});
		}
	});
};

exports.deleteByUsername = function (req, res) {
	Manager.remove({ username: req.params.username }, function (err, manager) {
		if (err)
			return res.send(err)
		res.json(manager);
	});
};

exports.listAll = function (req, res) {
	Manager.find({}, function (err, ex) {
		if (err)
			return res.send(err)
		res.json(ex);
	});
};

exports.comparePassword = function (req, res) {
	Manager.findOne({ username: req.body.username }, function (err, managerv) {
		if (err)
			return res.send(err);
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
			return res.send(err);

		Manager.findOne({ username: req.params.username }, function (err, managerv) {

			if (err)
				res.send(err);
			res.json(managerv.vehicles);
		});
	});
};

exports.getVehicles = function (req, res) {
	Manager.findOne({ username: req.params.username }, function (err, manager) {
		if (err)
			return res.send(err);
		res.json(manager.vehicles);
	});
};
