const windChill = document.querySelector('#wind-chill');

let wind = 5;         
let temperature = 10;

function calculateWindChill(temp, windSpeed) {
  return 13.12 + 0.6215 * temp - 11.37 * windSpeed ** 0.16 + 0.3965 * temp * windSpeed ** 0.16;
}

document.addEventListener('DOMContentLoaded', () => {
  if (temperature <= 10 && wind > 4.8) {
    let currentWindChill = calculateWindChill(temperature, wind);
    windChill.textContent = `${currentWindChill.toFixed(1)}°C`;
  } 
  else {
    windChill.textContent = 'N/A';
  }
});
