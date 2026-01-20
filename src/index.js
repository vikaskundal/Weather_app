// API keys and end point url
let API_key="53bc5f78fef601c7472512af4dc7d358";
let API_url="https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en";


// DOM Element

let searchBox=document.querySelector(".search input");
let searchButton=document.querySelector(".search .btn");
let weatherIcon=document.querySelector(".weather-icon");
let celciusBtn=document.getElementById("celcius");
let farenheitBtn=document.getElementById("farenheit");

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
        document.querySelector(".Air-pressure").innerHTML=data.main.pressure + ' hPa';
        
        // Add wind speed
        const windSpeed = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h
        document.querySelector(".wind-speed").innerHTML=windSpeed + ' km/h';
        
        // Add weather condition
        document.querySelector(".weather-condition").innerHTML=data.weather[0].description;

        // set the weather icon according to the weather condition
        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/clouds.png";
          } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "images/clear.png";
          } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "images/rain.png";
          } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
          } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist.png";
          } else if (data.weather[0].main === "Snow") {
            weatherIcon.src = "images/snow.png";
          }

          //display weather and details section hide error message with smooth animations

          const weatherEl = document.querySelector(".weather");
          const detailsEl = document.querySelector(".details");
          const degreeBtnEl = document.querySelector(".degree-btn");
          const errEl = document.querySelector(".err");

          // Hide error first
          errEl.classList.remove("show");
          errEl.style.display = "none";

          // Show weather with animation
          setTimeout(() => {
            weatherEl.style.display = "block";
            weatherEl.classList.add("show");
          }, 100);

          // Show details with delay
          setTimeout(() => {
            detailsEl.style.display = "flex";
            detailsEl.classList.add("show");
          }, 200);

          // Show degree buttons with delay
          setTimeout(() => {
            degreeBtnEl.style.display = "flex";
            degreeBtnEl.classList.add("show");
          }, 300);

          // Set active state for celcius button
          celciusBtn.classList.add("active");
          farenheitBtn.classList.remove("active");

          // store celcius value
          cel=tempCelcius;
        }catch(error){
            // hide weather and details section and display error message
            const weatherEl = document.querySelector(".weather");
            const detailsEl = document.querySelector(".details");
            const degreeBtnEl = document.querySelector(".degree-btn");
            const errEl = document.querySelector(".err");

            // Hide weather sections
            weatherEl.style.display = "none";
            weatherEl.classList.remove("show");
            detailsEl.style.display = "none";
            detailsEl.classList.remove("show");
            degreeBtnEl.style.display = "none";
            degreeBtnEl.classList.remove("show");

            // Show error with animation
            setTimeout(() => {
                errEl.style.display = "block";
                errEl.classList.add("show");
            }, 100);

            console.log(error);
    }
}


// Function to handle search
function handleSearch() {
    const city = searchBox.value.trim();
    if(city !== ""){
        // call the checkweather function when click searchbutton
        checkWeather(city);
        searchBox.blur(); // Remove focus from input
    }
}

// when we click search button
searchButton.addEventListener('click', handleSearch);

// When Enter key is pressed in search box
searchBox.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        handleSearch();
    }
});

// when farenheit button is clicked
farenheitBtn.addEventListener('click', () => {
    // convert the temp into farenheit and show it in the html
    if(cel !== undefined){
        let fer = Math.floor(cel * 1.8 + 32);
        document.querySelector(".temp").innerHTML = fer + "°F";
        // Update active state
        farenheitBtn.classList.add("active");
        celciusBtn.classList.remove("active");
    }
});

// event listener for celcius button click
celciusBtn.addEventListener('click', () => {
    // restore the celcius value and update html
    if(cel !== undefined){
        document.querySelector('.temp').innerHTML = cel + '°C';
        // Update active state
        celciusBtn.classList.add("active");
        farenheitBtn.classList.remove("active");
    }
});