const apiKey = '7c110e412ffa4883bb921358250806';
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');

const cityElement = document.getElementById('city');
const countryElement = document.getElementById('country');
const tempElement = document.getElementById('temperature');
const weatherIcon = document.getElementById('weather-icon');
const conditionElement = document.getElementById('condition');
const humidityElement = document.getElementById('humidity-value');
const windElement = document.getElementById('wind-value');

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
        if (!response.ok) {
            throw new Error('날씨 정보를 가져올 수 없습니다.');
        }
        const data = await response.json();
        updateWeatherInfo(data);
    } catch (error) {
        alert(error.message);
    }
}

function updateWeatherInfo(data) {
    cityElement.textContent = data.location.name;
    countryElement.textContent = `${data.location.region}, ${data.location.country}`;
    tempElement.textContent = `${Math.round(data.current.temp_c)}°C`;
    weatherIcon.src = `https:${data.current.condition.icon}`;
    conditionElement.textContent = data.current.condition.text;
    humidityElement.textContent = `${data.current.humidity}%`;
    windElement.textContent = `${data.current.wind_kph} km/h`;
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherData(city);
        }
    }
});

// 페이지 로드시 서울의 날씨 정보를 기본으로 표시
window.addEventListener('load', () => {
    getWeatherData('Seoul');
});
