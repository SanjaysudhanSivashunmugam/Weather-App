document.addEventListener('DOMContentLoaded', () => {
  const apiKey = '5279f3e102465a590c2ae20cc834cab0'; 
  const weatherCard = document.getElementById('weatherCard');
  const cityInput = document.getElementById('cityInput');
  const searchBtn = document.getElementById('searchBtn');

 
  const fetchWeather = async (city) => {
      try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
          if (!response.ok) {
              throw new Error('Weather data not available');
          }
          const weatherData = await response.json();
          displayWeather(weatherData);
      } catch (error) {
          console.error('Error fetching weather data:', error);
          weatherCard.innerHTML = `<p>Failed to fetch weather data. Please try again.</p>`;
      }
  };


  const displayWeather = (data) => {
      const { name, main, weather } = data;
      const { temp } = main;
      const { description } = weather[0];

      const weatherHTML = `
          <h2>${name}</h2>
          <div class="temperature">${Math.round(temp)}°C</div>
          <div class="description">${description}</div>
          <div class="location">Weather in ${name}</div>
      `;
      weatherCard.innerHTML = weatherHTML;
  };

  searchBtn.addEventListener('click', () => {
      const city = cityInput.value.trim();
      if (city) {
          fetchWeather(city);
      } else {
          alert('Please enter a city name.');
      }
  });

  fetchWeather('Dindigul');
});
