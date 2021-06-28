module.exports = function (app) {
	var manager = require('../controllers/managerController');
	var vehicle = require('../controllers/vehicleController');

	app.route('/manager')
		.get(manager.listAll)
		.post(manager.create)

	app.route('/manager/login')
		.post(manager.comparePassword)

	app.route('/manager/:username')
		.get(manager.getVehicles)
		.put(manager.updateVehicles);

	app.route('/vehicle')
		.get(vehicle.listAll)
		.post(vehicle.create);

	app.route('/vehicle/:uid')
		.get(vehicle.getByUid)
		.put(vehicle.updateVehicle)
		.delete(vehicle.deleteByUid);

	app.get('/health', (req, res) => {
		res.status(200).send('ok')
	})
};
