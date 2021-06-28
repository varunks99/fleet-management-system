let express = require('express'),
	app = express(),
	http = require('http'),
	ports = process.env.PORT || 8080,
	mongoose = require('mongoose'),
	cors = require('cors'),
	terminate = require('./terminate');

const server = http.createServer();

const uri = 'mongodb+srv://fleetuser:fleetuser@fleetmanagement.amo3c.mongodb.net/fleetdb?retryWrites=true&w=majority'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
app.use(express.urlencoded({ extended: true, useNewUrlParser: true, useUnifiedTopology: true }));
app.use(express.json());
app.use(cors());

var routes = require('./api/routes/routes');
routes(app);

const exitHandler = terminate(server, {
	coredump: false,
	timeout: 500
})

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
process.on('SIGINT', exitHandler(0, 'SIGINT'));

server.listen(ports, () => console.log(`Listening on port ${ports}`));