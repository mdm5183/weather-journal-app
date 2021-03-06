// Create a new date instance dynamically with JS
let d = new Date();
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
var n = month[d.getMonth()];
let newDate = n+' '+ d.getDate()+', '+ d.getFullYear();

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
		postData('/add', {date:newDate, temp:data.main.temp, newResponse})
	})
	.then(setTimeout(function() {
		updateUI();
		}, 700));
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
const postData = async (url = '', data = {})=> {
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
	}catch(error) {
		console.log("error", error);
	}
}

/* Function to update UI data */
const updateUI = async () => {
	const request = await fetch('/all')
	try{
		const allData = await request.json();
		console.log(allData);
		document.getElementById('date').innerHTML = allData.date;
		document.getElementById('temp').innerHTML = allData.temperature;
		document.getElementById('content').innerHTML = allData.content;
	}catch(error) {
		console.log("error", error);
	}
}