const apiKey = "d3b316697e5f410f642d5b8e42ace3ba";

const searchBox = document.querySelector('#city-name');
const searchBtn = document.querySelector('#search-btn');
const form = document.querySelector('#form')
// const weatherIcon = document.querySelector('');

async function weatherCheck(city){

    try {
        //current weather
        const currResp = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`);
        //5 day forecast
        const fivedayResp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${city}&appid=${apiKey}`);
            

            if(currResp.ok && fivedayResp.ok){
                const currData = await currResp.json();
                const fivedayData = await fivedayResp.json();

                console.log(currData);
                console.log(fivedayData);

                // changing the date timestamp format
                const timestamp = currData.dt;
                const date = new Date(timestamp * 1000);
                const formatDate = date.toLocaleDateString('en-GB');

                //changing today's weather using currData
                document.getElementById('city-today').textContent = `${currData.name} (${formatDate})`;
                document.getElementById('curr-temp').textContent = `Temprature: ${currData.main.temp} °c`;
                document.getElementById('curr-wind').textContent = `Wind: ${currData.wind.speed} metre/sec`;
                document.getElementById('curr-humidity').textContent = `Humidity: ${currData.main.humidity} %`;
                document.getElementById('weather-name').textContent = `${currData.weather[0].main}`;

                //changing weather icon as per the currData
                const weatherIcon = document.getElementById('weather-icon');
                if (currData.weather[0].main == "Clouds") {
                    weatherIcon.src = "./assets/baadal.png";
                  } else if (currData.weather[0].main == "Clear") {
                    weatherIcon.src = "./assets/clear.png";
                  } else if (currData.weather[0].main == "Haze") {
                    weatherIcon.src = "./assets/haze.png";
                  } else if (currData.weather[0].main == "Rain") {
                    weatherIcon.src = "./assets/rain.png";
                  } else if (currData.weather[0].main == "Drizzle") {
                    weatherIcon.src = "./assets/drizzle.png";
                  } else if (currData.weather[0].main == "Mist") {
                    weatherIcon.src = "./assets/mist.png";
                  }


                  //adding five day forecast
                  const container = document.getElementById('w-fiveday');

                  // looping through the list uptill 5 time 
                  // & adding a article for each iteration
                  for(let i = 1; i<=5; i++){
                        
                    const article = document.createElement('article');
                    article.id = `${i}`;
                    article.className = "flex justify-center rounded-md m-3 w-52 p-5 bg-neutral-600 text-cyan-100";

                    let src = './assets/baadal.png';

                    if (fivedayData.list[i].weather[0].main == "Clouds") {
                        src = "./assets/baadal.png";
                      } else if (fivedayData.list[i].weather[0].main == "Clear") {
                        src = "./assets/clear.png";
                      } else if (fivedayData.list[i].weather[0].main == "Haze") {
                        src = "./assets/haze.png";
                      } else if (fivedayData.list[i].weather[0].main == "Rain") {
                        src = "./assets/rain.png";
                      } else if (fivedayData.list[i].weather[0].main == "Drizzle") {
                        src = "./assets/drizzle.png";
                      } else if (fivedayData.list[i].weather[0].main == "Mist") {
                        src = "./assets/mist.png";
                      }

                    article.innerHTML = `
                                <div class="italic">
                                    <h1 class="font-bold text-xl ">01/10/2024</h1>
                                    <div class="mt-5">
                                        <p>Temp: ${fivedayData.list[i].main.temp} °c</p>
                                        <p>Wind: ${fivedayData.list[i].wind.speed} mtr/sec</p>
                                        <p>Humidity: ${fivedayData.list[i].main.humidity}%</p>
                                    </div>
                                </div>
                                <img src=${src} class="w-20 h-20 mt-4"  alt="weather-icon">
                    `
                    container.appendChild(article);
                  }

            }
            else{
                alert("Enter valid city name")
                console.log("Enter valid city name")
            }   
    }
    catch (error) {
        alert('Failed to fetch weather data.')
        console.log('Failed to fetch');
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    weatherCheck(searchBox.value);
})