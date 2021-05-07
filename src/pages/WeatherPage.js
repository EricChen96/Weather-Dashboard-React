import { useState, useEffect } from "react";
import SideBar from "../components/Sidebar";
import TitleBanner from "../components/TitleBanner";

function WeatherPage(props) {
    const [city, setCity] = useState();
    const [uvIndex, setUVIndex] = useState();
    const [date, setDate] = useState();
    var apiKey = "9533f3cb4c01176c409c57b70db75f3f";
    var cityLatitude, cityLongitude;
    const [citiesButtons, setCitiesButtons] = useState([]);
    var lastSearched;

    const searchCity = (cityRequest) => {
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityRequest + "&units=imperial&appid="
            + apiKey;
        fetch(queryUrl).then(res => res.json()).then(data => {
            setCity(data);
            setDate(new Date(data.dt * 1000).toLocaleDateString("en-US"));
            console.log(city);
            cityLongitude = data.coord.lon;
            cityLatitude = data.coord.lat;
            searchCityUVIndex(cityLongitude, cityLatitude);
            if (!citiesButtons.includes(data.name)) {
                citiesButtons.unshift(data.name);
                // createButtons();
                localStorage.setItem("cities", JSON.stringify(citiesButtons));
            }
            lastSearched = data.name;
            localStorage.setItem("lastSearched", lastSearched);
        }).catch((error)=> {
            console.log(error);

        })
    }

    const searchCityUVIndex = (cityLongitude, cityLatitude) => {
        var IVIndexQueryUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + cityLatitude + "&lon=" + cityLongitude + "&units=imperial&appid=" + apiKey;
        fetch(IVIndexQueryUrl).then((res) => res.json()).then((data) => {
            setUVIndex(parseInt(data.value))
            setUVColor();
        })
    }

    const setUVColor = () => {
        if(uvIndex>= 11) {
            return {backgroundColor: "purple"};
        }
        else if (uvIndex >= 8) {
            return {backgroundColor: "red"};
        }
        else if (uvIndex >= 6) {
            return {backgroundColor: "orange"};
        }
        else if (uvIndex >= 3) {
            return {backgroundColor: "yellow"};
        }
        else if (uvIndex >= 0) {
            return {backgroundColor: "green"};
        }
    }

    useEffect(() => {
        searchCity("San Diego");
        console.log(city);
    }, [])



    return (
        <div>
            <TitleBanner></TitleBanner>
            <div className="row">
                <div className="col-md-4">
                    <SideBar searchCity={searchCity}></SideBar>
                </div>
                <div className="col-md-8">
                    {city !== undefined &&
                        <div>
                            <div class="row">
                                <div class="card-body">
                                    <div class="main-city-name-date" >{`${city.name} (${date})`}</div>
                                    <img class="main-icon" src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}></img>
                                    <div class="main-display">Temperature: {`${city.main.temp} °`}<span class="main-temperature"></span></div>
                                    <div class="main-display">Humidity: {`${city.main.humidity} %`}<span class="main-humidity"></span></div>
                                    <div class="main-display">Wind Speed: {`${city.wind.speed} MPH`} <span class="main-windspeed"></span></div>
                                    <div class="main-display">UV Index: <span style={setUVColor()} class="border rounded-pill main-UV-Index">{uvIndex}</span></div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="card-body">
                                    <h2 class="five-day-forcast-title">5-Day Forcast</h2>
                                    <div class="row five-day-forcast-body">
                                        <div class="forcast-container">
                                            <div class="date-forcast-0"></div>
                                            <img class="icon-forcast-0"></img>
                                            <div class="temperature-forcast-0"></div>
                                            <div class="humidity-forcast-0"></div>
                                        </div>
                                        <div class="forcast-container">
                                            <div class="date-forcast-1"></div>
                                            <img class="icon-forcast-1"></img>
                                            <div class="temperature-forcast-1"></div>
                                            <div class="humidity-forcast-1"></div>
                                        </div>
                                        <div class="forcast-container">
                                            <div class="date-forcast-2"></div>
                                            <img class="icon-forcast-2"></img>
                                            <div class="temperature-forcast-2"></div>
                                            <div class="humidity-forcast-2"></div>
                                        </div>
                                        <div class="forcast-container">
                                            <div class="date-forcast-3"></div>
                                            <img class="icon-forcast-3"></img>
                                            <div class="temperature-forcast-3"></div>
                                            <div class="humidity-forcast-3"></div>
                                        </div>
                                        <div class="forcast-container">
                                            <div class="date-forcast-4"></div>
                                            <img class="icon-forcast-4"></img>
                                            <div class="temperature-forcast-4"></div>
                                            <div class="humidity-forcast-4"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    }

                </div>
            </div>

        </div>
    )

}

export default WeatherPage;