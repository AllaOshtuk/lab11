
function triggerBtnClick() {
  document.getElementById('btn').click();
  const weatherBlock = document.querySelector('#weather')
  async function loadWeather(w) {
    weatherBlock.innerHTML = `<div class="loading"><img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif" alt="Loading..."</div>`;
    const server = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=1ab97e56a4556f68962e99b06b0f04b0';
    const responce = await fetch(server, {
      method: 'GET',
    });
    const responceResult = await responce.json();

    if (responce.ok) {
      getWeather(responceResult);
    } else {
      weatherBlock.innerHTML = responceResult.message;
    }
  }

  function getWeather(data) {
    const temp = Math.round((5/9)*((Math.round(data.main.temp))-32));
    const windspeed= Math.round(((data.wind.speed)*0.447)*100+Number.EPSILON)/100;
    const humidity = data.main.humidity;

    const template = `<p> temperature: ${temp} °F</p>
        <p> wind speed: ${windspeed} m/s</p>
        <p>humidity: ${humidity}%</p>`;

    weatherBlock.innerHTML = template;

  }

  if (weatherBlock) {
    loadWeather();
  }
}