const express = require('express')
const router = express.Router()
const manager = require('../controllers/managerController');
const vehicle = require('../controllers/vehicleController');

router.route('/manager')
	.get(manager.listAll)
	.post(manager.create)

router.route('/manager/login')
	.post(manager.comparePassword)

router.route('/manager/:username')
	.get(manager.getVehicles)
	.put(manager.updateVehicles);

router.route('/vehicle')
	.get(vehicle.listAll)
	.post(vehicle.create);

router.route('/vehicle/:uid')
	.get(vehicle.getByUid)
	.put(vehicle.updateVehicle)
	.delete(vehicle.deleteByUid);

router.get('/health', (req, res) => {
	res.status(200).send('healthy')
})

module.exports = router;

