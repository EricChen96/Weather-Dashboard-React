function MainWeatherDisplay(props) {
    return (
        <div className="row">
            <div className="card-body">
                <div className="main-city-name-date" >{`${props.city.name} (${props.date})`}</div>
                <img className="main-icon" src={`https://openweathermap.org/img/wn/${props.city.weather[0].icon}@2x.png`}></img>
                <div className="main-display">Temperature: {`${props.city.main.temp} °`}<span className="main-temperature"></span></div>
                <div className="main-display">Humidity: {`${props.city.main.humidity} %`}<span className="main-humidity"></span></div>
                <div className="main-display">Wind Speed: {`${props.city.wind.speed} MPH`} <span className="main-windspeed"></span></div>
                <div className="main-display">UV Index: <span style={props.setUVColor()} className="border rounded-pill main-UV-Index">{props.uvIndex}</span></div>
            </div>
        </div>
    )
}

export default MainWeatherDisplay;