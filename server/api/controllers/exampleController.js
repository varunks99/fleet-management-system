var mongoose = require('mongoose'),
	Example = mongoose.model('Examples');

exports.listAll = function(req, res) {
	Example.find({}, function(err, ex) {
		if(err)
			res.send(err)
		res.json(ex);
	});
};

exports.create = function(req, res) {
	var newEx = new Example(req.body);
	newEx.save(function(err, ex) {
		if(err)
			res.send(err);
		res.json(ex);
	});
};

exports.getByUid = function(req, res) {
	Example.findOne({uid: req.params.uid}, function(err, ex) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		if(err)
			res.send(err);
		res.json(ex);
	});
};
//{speed: req.params.speed, longitude: req.params.longitude, latitude: req.params.latitude}
exports.updateExample = function(req, res) {
	Example.findOneAndUpdate({uid: req.params.uid}, {$push: {"data": req.body }}, {safe: true, upsert: true}, function(err, ex) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		if(err)
			res.send(err)
		Example.findOne({uid: ex.uid}, function(err, example) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		if(err)
			res.send(err);
		res.json(example);
	});
	});
};

exports.deleteByUid = function(req, res) {
	Example.remove({uid: req.params.uid}, function(err, ex) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		if(err)
			res.send(err)
		res.json(ex);
	});
};
