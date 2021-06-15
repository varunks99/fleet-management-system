module.exports = function(app) {
	var example = require('../controllers/exampleController');
	var manager = require('../controllers/managerController');
	var vehicle = require('../controllers/vehicleController');

	app.route('/example')
		.get(example.listAll)
		.post(example.create);

	app.route('/example/:uid')
		.get(example.getByUid)
		.put(example.updateExample)
		.delete(example.deleteByUid);

	app.route('/manager')
		.get(manager.listAll)
		.post(manager.create)
		
	app.route('/manager/login')
		.post(manager.comparePassword)

	app.route('/manager/:username')
		.get(manager.getVehicles)
		.put(manager.updateVehicles);
		// .delete(manager.deleteByUsername);
		//.delete(manager.deleteVehicles);

	app.route('/vehicle')
		.get(vehicle.listAll)
		.post(vehicle.create);

	app.route('/vehicle/:uid')
		.get(vehicle.getByUid)
		.put(vehicle.updateVehicle)
		.delete(vehicle.deleteByUid);

};
