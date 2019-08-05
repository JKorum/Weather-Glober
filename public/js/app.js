const button = document.querySelector(`button`);
const search = document.querySelector(`#search`);
const messageOne = document.querySelector(`#message-1`);
const messageTwo = document.querySelector(`#message-2`);

async function fetcher(location) {
	messageOne.textContent = `Loading...`;
	messageTwo.textContent = ``;		
	const encodedLocation = encodeURIComponent(location);
	const url = `/weather?location=${encodedLocation}`;
	const jsonData = await fetch(url);
	const data = await jsonData.json();	

	if(!data.error) { //for handling issues of JSON endpoint
		messageOne.textContent = data.location;
		messageTwo.textContent = data.forecast;	
	} else {
		messageOne.textContent = `Error: ${data.error}. Try another search.`;
	}
}		

function handleClick(event) {	
	const location = search.value;	
	fetcher(location).catch(error => {
		console.log(error);
		messageOne.textContent = `Error: ${error.message}. Try another search.`;
	}); // handler for technical issues of fetch API
	event.stopPropagation();
}

button.addEventListener(`click`, handleClick);

