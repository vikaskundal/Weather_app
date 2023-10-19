// API keys and end point url
let API_key="53bc5f78fef601c7472512af4dc7d358";
let API_url="https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en";


// DOM Element

let searchBox=document.querySelector(".search input");
let searchButton=document.querySelector(".search .btn");
let weatherIcon=document.querySelector(".weather-icon");

let cel;

// function to check weather for city

async function checkWeather(city) {
    try{
        // make API call to fetch weather data
        const response= await fetch(`${API_url}&q=${city}&appid=${API_key}`);
        
        if(!response.ok){
            throw new Error('unable to fetch weather data');
        }

        // parse the JSON response

        const data=await response.json();

        // now we get the weather information 
        //updating the DOM with this information

        document.querySelector(".city").innerHTML=data.name;
        const tempCelcius=Math.round(data.main.temp);
        document.querySelector(".temp").innerHTML=tempCelcius+'°C';
        document.querySelector(".humidity").innerHTML=data.main.humidity+'%';
        document.querySelector(".Air-pressure").innerHTML=data.main.pressure;

        // set the weather icon according to the weather condition
        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "../images/clouds.png";
          } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "../images/clear.png";
          } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "../images/rain.png";
          } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "../images/drizzle.png";
          } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "../images/mist.png";
          }

          //display weather and detials section hide error message

          document.querySelector(".weather").style.display="block";
          document.querySelector(".details").style.display="block";
          document.querySelector(".degree-btn").style.display="block";
          document.querySelector(".err").style.display="none";

          // store celcius value

          cel=tempCelcius;
        }catch(error){
            // hide eather and details section and display error message
            document.querySelector(".err").style.display= "block";
            document.querySelector(".details").style.display= "none";
            document.querySelector(".degree-btn").style.display= "none";
            document.querySelector(".weather").style.display= "none";
            console.log(error);


    }
}


// when we click search button

searchButton.addEventListener('click',()=> {
    const city=searchBox.value.trim();
    if(city!==""){
        // call the checkweather function when click searchbutton
        checkWeather(city);

    }



});
// when farenheit button is click

document.getElementById("farenheit").addEventListener('click',()=>{
    // convert the temp into farenheit and show it in the html

    if(cel!==undefined){
        let fer = Math.floor(cel * 1.8 + 32);
        document.querySelector(".temp").innerHTML = fer + "°F";
      }


    

});
// event listener for celcius button click

document.getElementById("celcius").addEventListener('click',()=>{
    // restore the celcius value and update html
    if(cel!==undefined){
        document.querySelector('.temp').innerHTML=cel+'°C';
    }

});