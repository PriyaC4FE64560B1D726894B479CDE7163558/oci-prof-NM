// OpenWeather API Key (Replace with your API key)
const API_KEY = 'YOUR_OPENWEATHER_API_KEY';
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('city');
const weatherInfo = document.getElementById('weather-info');

// Event listener for Search button
searchBtn.addEventListener('click', () => {
    const cityName = cityInput.value.trim();
    if (cityName) {
        fetchWeather(cityName);
    } else {
        alert('Please enter a city name');
    }
});

// Function to fetch weather data from OpenWeather API
async function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`; // Use units=metric for Celsius
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found or API error');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
}

// Function to display weather data
function displayWeather(data) {
    const { main, weather, wind } = data;
    const temperature = main.temp;
    const humidity = main.humidity;
    const description = weather[0].description;
    const iconCode = weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${iconUrl}" alt="${description}" class="weather-icon">
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Weather:</strong> ${description}</p>
        <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
    `;
}
