var express = require('express'),
	app = express(),
	ports = process.env.PORT || 8080,
	mongoose = require('mongoose'),
	Example = require('./api/models/exampleModel'),
	Manager = require('./api/models/managerModel'),
	Vehicle = require('./api/models/vehicleModel'),
	bodyParser = require('body-parser'),
	cors = require('cors');
mongodb = require('mongodb'),
	nconf = require('nconf');
server = false;

if (server) {
	nconf.argv().env().file('keys.json');
}
/*
const user = nconf.get('mongoUser');
const pass = nconf.get('mongoPass');
const host = nconf.get('mongoHost');
const port = nconf.get('mongoPort');


let uri = `mongodb://${user}:${pass}@${host}:${port}`;
if (nconf.get('mongoDatabase')) {
	  uri = `${uri}/${nconf.get('mongoDatabase')}`;
}
console.log(uri);
*/
uri = 'mongodb://fleet:manager@ds259855.mlab.com:59855/fleetdb'
urilocal = 'mongodb+srv://fleetuser:fleetuser@fleetmanagement.amo3c.mongodb.net/fleetdb?retryWrites=true&w=majority'
//mongoose.Promise = global.Promise;
if (server) {
	mongoose.connect(uri, { useMongoClient: true });
}
else {
	mongoose.connect(urilocal, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var routes = require('./api/routes/exampleRoute');
routes(app);

app.listen(ports, () => console.log(`Listening on port ${ports}`));
