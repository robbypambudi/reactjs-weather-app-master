import React, { useState } from "react";
import { IconContext } from "react-icons/lib";
import { BiCloud } from "react-icons/bi";
import { WiThunderstorm } from "react-icons/wi";
import { BsCloudDrizzle } from "react-icons/bs";
import { WiRain } from "react-icons/wi";
import { BiCloudSnow } from "react-icons/bi";
import { WiDaySunny } from "react-icons/wi";

const Card = () => {
  const api = {
    key: "53c5c1f7bd9a0b102354de4f9725b8af",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  const dateBuilder = (d) => {
    let date = String(new window.Date());
    date = date.slice(0, 15);
    
    return date;
  }

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [text, setText] = useState('');

  const search = evt => {
    if(evt.key === "Enter")
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).then(res => res.json()).then(result => {
        setWeather(result);
        setQuery('');
        });
    else {
      setText(text);
    }
  }

  const iconSwitch = (crntWeather) => {
    switch(crntWeather) {
      case 'Thunderstorm' :
        return <WiThunderstorm className="mt-6 self-center inline-flex items-center justify-center" />;
      case 'Drizzle' :
        return <BsCloudDrizzle className="mt-6 self-center inline-flex items-center justify-center" />;
      case 'Rain' :
        return <WiRain className="mt-6 self-center inline-flex items-center justify-center" />;
      case 'Snow' :
        return <BiCloudSnow className="mt-6 self-center inline-flex items-center justify-center" />;
      case 'Clear' :
        return <WiDaySunny className="mt-6 self-center inline-flex items-center justify-center" />;
      default :
        return <BiCloud className="mt-6 self-center inline-flex items-center justify-center" />;
    }
  }

  return (
    <div>
      {(typeof weather.main != "undefined") ? (
        <IconContext.Provider value={{ size:"6em", color:"black" }}>
          <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col bg-white rounded-lg p-8 w-full max-w-xs border border-gray-600 border-opacity-50 filter drop-shadow-md">
              <div className="font-bold text-3xl mb-7">Weather App</div>
              <div className="mb-7 text-gray-600">
                <input className="border border-gray-600 border-opacity-50 bg-white h-10 px-5 w-full rounded-lg text-sm text-gray-500 focus:outline-none"
                  type="text" name="search" placeholder="Search city name..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} />
              </div>
              <div className="text-sm text-500 font-bold">{weather.sys.country}</div>
              <div className="font-bold text-4xl mb-2">{weather.name}</div>
              <div className="text-sm text-gray-500">{dateBuilder()}</div>
              {iconSwitch(weather.weather[0].main)}
              <div className="flex flex-row items-center justify-center mt-6">
                <div className="font-medium text-6xl">{Math.round(weather.main.temp)}°c</div>
                <div className="flex flex-col items-center ml-6">
                  <div>{weather.weather[0].main}</div>
                  <div className="mt-1">
                    <span className="text-sm">
                      <i className="far fa-long-arrow-up"></i>
                    </span>
                    <span className="text-sm font-light text-gray-500">{Math.round(weather.main.feels_like)}°C</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-evenly mt-6">
                <div className="flex flex-col items-center">
                  <div className="font-medium text-sm">Wind</div>
                  <div className="text-sm text-gray-500">{Math.round(weather.wind.speed)}m/s</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-medium text-sm">Humidity</div>
                  <div className="text-sm text-gray-500">{Math.round(weather.main.humidity)}%</div>
                </div>
              </div>
            </div>
          </div>
        </IconContext.Provider>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col bg-white rounded-lg p-8 w-full max-w-xs border border-gray-600 border-opacity-50 filter drop-shadow-md">
            <div>{text}</div>
            <div className="font-bold text-3xl mb-7">Weather App</div>
            <div className="text-gray-600">
              <input className="border border-gray-600 border-opacity-50 bg-white h-10 px-5 w-full rounded-lg text-sm text-gray-500 focus:outline-none" type="text" name="search" placeholder="Search city name..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} />
            </div>
            {(weather.message === "city not found") ? (
              <div className="font-semibold text-sm text-red-400 mt-7">City not found!</div>
            ) : ('')}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;