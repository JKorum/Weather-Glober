const request = require('request');

// json: true --> will auto parse request's body as JSON 

const geocode = (location, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoia29ydW02NjYiLCJhIjoiY2p5bG9tZXh6MDl0ZjNubm94b21hOGlwMCJ9.yi4m2hourPIZiDHA5kSGCA&limit=1`;

	request({ url, json: true }, (error, { body }) => {
		if(error) {			
			callback(`Unable to connect to location service`, undefined);
		} else if(body.features.length === 0) {			
			callback(`Unable to get coordinates for provided location`, undefined);
		} else {			
			callback(undefined, {
				location: body.features[0].place_name,
				longitude: body.features[0].center[0],
				latitude: body.features[0].center[1]
			});
		}
	})

};

module.exports = geocode;

