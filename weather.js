const apiKey = 'f00c38e0279b7bc85480c3fe775d518c'; // Replace with your actual API Key

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("city-input-btn").addEventListener("click", function () {
        const city = document.getElementById("city-input").value;
        if (city) {
            fetchWeather(city);
        } else {
            alert("Please enter a city name!");
        }
    });
});

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            displayWeather(data);
        } else {
            alert("City not found. Please try again.");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function displayWeather(data) {
    document.getElementById("city-name").textContent = data.name;
    document.getElementById("date").textContent = moment().format('MMMM Do YYYY, h:mm:ss a');
    document.getElementById("temperature").innerHTML = `${data.main.temp}°C`;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("wind-speed").innerHTML = `Wind Speed: ${data.wind.speed} m/s`;

    // ✅ Display Weather Icon
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const weatherInfo = document.getElementById("weather-info");
    weatherInfo.style.display = "block";
    setTimeout(() => {
        weatherInfo.style.opacity = "1";
    }, 100);
}
