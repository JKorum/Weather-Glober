const request = require('request');

// json: true --> will auto parse request's body as JSON 
// https://api.darksky.net/forecast/[key]/[latitude],[longitude]

const forecast = (coordinates, callback) => {

	const { longitude, latitude } = coordinates;
	const url = `https://api.darksky.net/forecast/7e3c384d8247baf3bd943e1815cc18bb/${latitude},${longitude}?units=si`;
	request({ url, json: true }, (error, { body }) => {
		if(error) {
			callback(`Unable to connect to weather service`, undefined)
		} else if(body.code === 400) {
			callback(`Unable to get weather forecast due to invalid request`, undefined);
		} else {			
			callback(undefined, {				
				summary: body.daily.data[0].summary,
				temperature: Math.round(body.currently.temperature),
				rainProbability: Math.round(body.currently.precipProbability * 100)
			});
		}	
	});
};

module.exports = forecast;