// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express')
const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 5000;
const server = app.listen(port, listening);

function listening() {
	console.log(`running on localhost: ${port}`)
};

//GET 
app.get('/all', function (req, res) {
	res.send(projectData);
});

// POST 
app.post('/add', addWeather)
function addWeather(req, res) {
	newData = {
		temperature: req.body.temperature,
		date: req.body.date,
		content: req.body.newResponse,
	}
	projectData.push(newData);
	res.send(newData)
} 
