let baseurl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = `8e9904f1688163cc5f100580b7810cc9`;


document.addEventListener('DOMContentLoaded', function(event){
    setHeader();

    setFooter();

    setContent();
});

document.addEventListener('click', function(event){
    if(event.target.nodeName === 'BUTTON'){
        generateClicked(event);
    }
})

function setHeader(){
    let header = document.querySelector('.header');
    header.innerHTML = '<h1>Weather-Journal App</h1><h2>Provide your zip code and How you are feeling at the moment</h2>';
}

function setFooter(){
    let footer = document.querySelector('.footer');
    footer.innerHTML = '<h3>This app is a proprietary property of the jounal development association. Copyright rules apply.';
}

function setContent(){
    let content = document.querySelector('.content');
    content.innerHTML = '<div class="zip"><label for="zip">Enter Zip Code Here:</label>';
    content.innerHTML += '<input id="zip" placeholder="Enter your zip code here..." type="text"></div>';
    content.innerHTML += '<div class="data"><label for="feelings">How are you feeling today?</label>';
    content.innerHTML += '<textarea id="feelings" placeholder="Let us know how you are feeling today..." rows=9 columns-50></textarea></div>';
    content.innerHTML += '<button id="generate" style="font-size: 16px;">Generate</button><br>';

    content.innerHTML += '<div id="entryHolder"><b>Latest input and result is:</b><br>';
    content.innerHTML += '<div id="date"></div>';
    content.innerHTML += '<div id="temp"></div>';
    content.innerHTML += '<div id="content"></div></div><br>';

    setResultDisplayNone();
}

function setResultDisplayNone(){
    document.getElementById('date').style.visibility = "hidden";
    document.getElementById('temp').style.visibility = "hidden";
    document.getElementById('content').style.visibility = "hidden";
    document.getElementById('entryHolder').style.visibility = "hidden";
}

function generateClicked(event){
    let zipcode = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;
    if(zipcode != "" && zipcode != null && feelings != "" && feelings != null){
        let dateObject = new Date();
        let date = `${dateObject.getDate()}/${dateObject.getMonth()}/${dateObject.getFullYear()}`;
        let temp = 0;

        clientget(baseurl+zipcode+',in&appid='+apiKey)
        .then(function(data){
            if(data.cod == 200){
                clientpost('/save', {
                    zipcode: zipcode,
                    feelings: feelings,
                    date: date,
                    temp: data.main.temp
                });
            }
        }).then(function(data){
            clientget('/fetch');
        });
    }
}

let clientpost = async (url='', data = {}) => {
    console.log(data);
    let resp = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try{
        console.log("post response:");
        console.log(resp);
    }catch(error){
        console.log(`error of post ${url}`, error);
    }
}

let clientget = async (url = '') => {
    let response = await fetch(url);
    try{
        const res = await response.json();
        console.log('Get response: ');
        console.log(res);
        
        if(url == '/fetch' && res != {} && res != null){
            updateContent(res);
        } else{
            return res;
        }
    }catch(error){
        console.log(`error of get ${url}`, error);
    }
}

function updateContent(data){
    if(data != null && data != {} && data != ''){
        let date = document.getElementById('date');
        let temp = document.getElementById('temp');
        let cont = document.getElementById('content');

        date.innerHTML = 'On Date: ' + data.date;
        temp.innerHTML = 'At temperature: ' + data.temp;
        cont.innerHTML = 'You are feeling, ' + data.feelings;

        date.style.visibility = "visible";
        temp.style.visibility = "visible";
        cont.style.visibility = "visible";
        document.getElementById('entryHolder').style.visibility = "visible";

        document.getElementById('zip').value = "";
        document.getElementById('feelings').value = "";
    }
}