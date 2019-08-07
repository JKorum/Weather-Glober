const express = require(`express`);
const path = require(`path`);
const hbs = require(`hbs`);
const geocode = require(`./utils/geocode.js`);
const forecast = require(`./utils/forecast.js`);

const app = express();
const port = process.env.PORT || 3000;

// define paths for Express configuration  
const publicDirPath = path.join(__dirname, `../public`);
const viewsDirPath = path.join(__dirname, `../templates/views`);
const partialsDirPath = path.join(__dirname, `../templates/partials`);

// set up handlebars engine and views and partials locations
app.set(`view engine`, `hbs`);
app.set(`views`, viewsDirPath);
hbs.registerPartials(partialsDirPath);

//set up static directory to serve
app.use(express.static(publicDirPath)); 

app.get(``, (req, res) => {
	res.render(`index`, {
		title: `Weather Glober`,		
		name: `Made by Korum`		
	});
});

app.get(`/about`, (req, res) => {
	res.render(`about`, {
		title: `About`,
		name: `Made by Korum`				
	});
});

app.get(`/help`, (req, res) => {
	res.render(`help`, {
		title: `Help`,
		name: `Made by Korum`				
	});
});

app.get(`/weather`, (req, res) => {
	if(!req.query.location) {
		res.send({
			error: `Location must be provided`
		});
	} else {
		geocode(req.query.location, (error, data) => { 	
			if(error) {				
				res.send({ error: error });				
			} else {				
				forecast(data, (error, forecastData) => {
					if(error) {
						res.send({ error: error });
					} else {						
						res.send({
							requestedLocation: req.query.location,
							location: data.location,
							forecast: `${forecastData.summary} It's currently ${forecastData.temperature} degrees of celsius. There is ${forecastData.rainProbability}% chance of rain.` 
						});
					}					
				})
			}	
		});
	}	
});

app.get(`/help/*`, (req, res) => {
	res.render(`notfound`, {
		message: `Help page not found`,
		name: `Made by Korum`,
		title: `Error 404`
	});
});

app.get(`*`, (req, res) => {
	res.render(`notfound`, {
		message: `Page not found`,
		name: `Made by Korum`,
		title: `Error 404`
	});
});

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
