import { useState, useEffect } from "react";
import SideBar from "../components/Sidebar";
import TitleBanner from "../components/TitleBanner";
import MainWeatherDisplay from "../components/MainWeatherDisplay";
import FiveDayForcast from "../components/FiveDayForcast";

function WeatherPage(props) {
    const [city, setCity] = useState();
    const [uvIndex, setUVIndex] = useState();
    const [date, setDate] = useState();
    const [fiveDayForcast, setFiveDayForcast] = useState([{
        date: "",
        iconURL: "",
        temperature: "",
        humidity: "",
    }]);
    var apiKey = "9533f3cb4c01176c409c57b70db75f3f";
    var cityLatitude, cityLongitude;


    const citiesButtonHistory = localStorage.getItem("cities") !== null ? JSON.parse(localStorage.getItem("cities")) : [];
    const [citiesButtons, setCitiesButtons] = useState(citiesButtonHistory);

    const lastSearchedHistory = localStorage.getItem("lastSearched") !== null ? localStorage.getItem("lastSearched") : "New York";
    const [lastSearched, setLastSearched] = useState(lastSearchedHistory);

    const searchCity = (cityRequest) => {
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityRequest + "&units=imperial&appid="
            + apiKey;
        fetch(queryUrl)
            .then(res => {
                if (!res.ok) {
                    return city;
                }
                return res.json()
            })
            .then(data => {
                setCity(data);
                setDate(new Date(data.dt * 1000).toLocaleDateString("en-US"));
                cityLongitude = data.coord.lon;
                cityLatitude = data.coord.lat;
                searchCityUVIndex(cityLongitude, cityLatitude);
                searchFiveDayForcast(data.name)
                if (!citiesButtons.includes(data.name)) {
                    setCitiesButtons([data.name, ...citiesButtons]);
                }
                setLastSearched(data.name);
            }).catch((error) => {
                console.log(error);
            })
    }

    const getCitySearchHistory = () => {
        searchCity(lastSearched);
        searchFiveDayForcast(lastSearched);
    }

    const removeCitySearchHistorySingle = (city) => {
        var tempHistoryCopy = [...citiesButtons];
        var cityIndex = tempHistoryCopy.indexOf(city);
        if(cityIndex !== -1) {
            tempHistoryCopy.splice(cityIndex,1);
            setCitiesButtons(tempHistoryCopy);
        }
    }

    const searchCityUVIndex = (cityLongitude, cityLatitude) => {
        var IVIndexQueryUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + cityLatitude + "&lon=" + cityLongitude + "&units=imperial&appid=" + apiKey;
        fetch(IVIndexQueryUrl)
            .then((res) => res.json())
            .then((data) => {
                setUVIndex(parseInt(data.value));
                setUVColor();
            })
    }

    const setUVColor = () => {
        if (uvIndex >= 11) {
            return { backgroundColor: "purple" };
        }
        else if (uvIndex >= 8) {
            return { backgroundColor: "red" };
        }
        else if (uvIndex >= 6) {
            return { backgroundColor: "orange" };
        }
        else if (uvIndex >= 3) {
            return { backgroundColor: "yellow" };
        }
        else if (uvIndex >= 0) {
            return { backgroundColor: "green" };
        }
    }

    function searchFiveDayForcast(city) {
        var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;
        fetch(queryUrl)
            .then(res => res.json())
            .then(data => {
                let fiveDayForcastHolder = [];
                for (var dateCount = 0; dateCount < 5; dateCount++) {
                    let dailyForcast = {};
                    dailyForcast.date = data.list[dateCount * 8].dt_txt.substring(0, 10);
                    dailyForcast.iconUrl = "https://openweathermap.org/img/wn/" + data.list[dateCount * 8].weather[0].icon + ".png";
                    dailyForcast.temperature = "Temperature: " + data.list[dateCount * 8].main.temp + "°";
                    dailyForcast.humidity = "Humidity: " + data.list[dateCount * 8].main.humidity + "%";
                    fiveDayForcastHolder.push(dailyForcast);
                }
                setFiveDayForcast(fiveDayForcastHolder);
            })
    }

    useEffect(() => {
        getCitySearchHistory();
    }, [])

    useEffect(() => {
        localStorage.setItem("cities", JSON.stringify(citiesButtons));
    }, [citiesButtons])

    useEffect(() => {
        localStorage.setItem("lastSearched", lastSearched);
    }, [lastSearched])

    return (
        <div >
            <div className="row">
                <TitleBanner></TitleBanner>
                <div className="col-md-4" style={{ backgroundColor: "#C5CBE3", borderStyle: "solid" }}>
                    <SideBar searchCity={searchCity} citiesButtons={citiesButtons} removeCitySearchHistorySingle={removeCitySearchHistorySingle}></SideBar>
                </div>
                <div className="col-md-8" style={{ backgroundColor: "#EFE2BA" }}>
                    {city !== undefined &&
                        <div>
                            <MainWeatherDisplay city={city} date={date} setUVColor={setUVColor} uvIndex={uvIndex}></MainWeatherDisplay>
                            <FiveDayForcast fiveDayForcast={fiveDayForcast}></FiveDayForcast>
                        </div>
                    }

                </div>
            </div>

        </div>
    )

}

export default WeatherPage;