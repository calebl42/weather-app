import "./styles.css";
import { format } from "date-fns";

let main = document.querySelector("main");
let form = document.querySelector("form");

async function getGifURL(conditions) {
  let response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=A41YND7BF4hRpp7FCPckNKTPPeIh6PwL&s=${conditions}`);
  let gifData = await response.json();

  console.log(gifData.data.images.original.url);
  return gifData.data.images.original.url;
}

async function getForecast() {
  let container = document.getElementById("container");
  let response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/glasgow?unitGroup=us&key=YMF6J5AKTH37SASMXBXZBV84F&contentType=json");
  let weatherData = await response.json();
  console.log(weatherData);

  let addressElement = document.createElement("h1");
  addressElement.textContent = `Weather for ${weatherData.resolvedAddress}`;
  addressElement.id = "address";

  let datetimeElement = document.createElement("h2");
  datetimeElement.id = "datetime";
  const currentDate = new Date(weatherData.currentConditions.datetimeEpoch * 1000);
  datetimeElement.textContent = format(currentDate, "cccc, p");

  let conditionsElement = document.createElement("p");
  conditionsElement.textContent = `Current conditions: ${weatherData.currentConditions.conditions}`;
  conditionsElement.id = "conditions";

  let humidityElement = document.createElement("p");
  humidityElement.textContent = `Humidity: ${weatherData.currentConditions.humidity}%`;
  humidityElement.id = "humidity";

  let tempElement = document.createElement("p");
  tempElement.textContent = `Temperature: ${weatherData.currentConditions.temp}°F`;
  tempElement.id = "temp";

  let precipprobElement = document.createElement("p");
  precipprobElement.id = "precipprob";
  precipprobElement.textContent = `Precipitation probability: ${weatherData.currentConditions.precipprob}%`;
  
  main.style.backgroundImage = `url("${await getGifURL(weatherData.currentConditions.conditions)}")`;
  let otherInfo = document.createElement("div");
  otherInfo.id = "otherinfo";
  for (let el of [conditionsElement, humidityElement, precipprobElement]) {
    otherInfo.appendChild(el);
  }
  for (let el of [addressElement, datetimeElement, tempElement, otherInfo]) {
    container.appendChild(el);
  }
}

getForecast();