// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
let baseURL =  'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip='
const apiKey = '&APPID=bd13cd89e2841acdbab6011ea4942ce9'

const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=imperial`;

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
	const newZip = document.getElementById('zip').value;
	const newResponse = document.getElementById('feelings').value;
	
	getWeather(baseURL, newZip, apiKey)
	.then(function(data) {
		console.log(data)
		console.log(newResponse)
		postData('/add', {date:newDate, temperature:data.main.temp, newResponse})
	})
	.then(
		updateUI()
		)
	};

/* Function to GET Web API Data*/
const getWeather = async (baseURL, newZip, apiKey)=>{
  const res = await fetch(baseURL+newZip+apiKey)
  try {
    const data = await res.json();
    return data;
  }catch(error) {
    console.log("error", error);
  }
}

/* Function to POST data */
const postData = async ( url = 'http://localhost:5000/add', data = {})=> {
	const response = await fetch(url, {
		method: 'POST',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),	
		});
	try {
		const newData = await response.json();
		console.log(newData);
		return(newData)
	}catch(error) {
		console.log("error", error);
	}
}

/* Function to GET Project Data */
const updateUI = async () => {
	const request = await fetch('/all')
	try{
		const allData = await request.json();
		console.log(allData);
		document.getElementById('date').innerHTML = allData[0].newDate;
		document.getElementById('temp').innerHTML = allData[0].temperature;
		document.getElementById('content').innerHTML = allData[0].content;
	}catch(error) {
		console.log("error", error);
	}
}