// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
let baseURL = 'api.openweathermap.org/data/2.5/weather?'
const apiKey = 'bd13cd89e2841acdbab6011ea4942ce9'

const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=imperial`;

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){
	const newZipCode = document.getElementById('zip').value;
	const newContent = document.getElementById('feelings').value;

	getWeather(baseURL, newZipCode, apiKey)
	  	.then(function(data){
	    console.log(data);
	    postData('/add', {date:newDate, temp:data.temp, content:newContent} );
	  })
	  .then(
	    updateUI()
	  )
	}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, newZipCode, apiKey) =>{ 
  const request = await fetch(baseURL + newZipCode + apiKey);
  try {
  const data = await request.json();
  return data;
  }
  catch(error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    	date: data.date,
    	temp: data.temp,
    	content: data.content
    })      
  });

    try {
      const newData = await request.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

//update UI
const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.content;
}catch(error){
    console.log("error", error);
  }
}
