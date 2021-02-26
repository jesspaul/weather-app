// state variables
let weatherData;

// cached element references
const $city = $('#city');
const $temp = $('#temp');
const $feelsLike = $('#feels-like');
const $weather = $('#weather');
const $input = $('#user-input');


// constants
const API_KEY = '4094db56080449fabec519fd5ed7f781';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';


// event listeners
$('form').on('submit', handleSubmit);


// functions
function handleSubmit(evt) {
    evt.preventDefault();

    const term = $input.val();
    $input.val('');

    $.ajax(`${BASE_URL}?appid=${API_KEY}&q=${term}&units=imperial`)
    .then(function(data) {
        weatherData = data;
        render();
    }, function(error) {
        console.log('Error ', error);
        render();
    });
};

function render() {
    if (weatherData) {
        $city.text(`${weatherData.name}, ${weatherData.sys.country}`);
        $temp.text(`${weatherData.main.temp}° F`);
        $feelsLike.text(`${weatherData.main.feels_like}° F`);
        $weather.text(weatherData.weather[0].main);

        let $weatherImg = $(`<img src='http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png'>`);
        console.log($weatherImg)
        $('#weather').append($weatherImg);
    }
}