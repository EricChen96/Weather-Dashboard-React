function MainWeatherDisplay(props) {
    return (
        <div className="row" style={{ backgroundColor: "#659DBD", borderStyle: "solid" }}>
            <div className="col-md-8" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "200%", fontWeight: "bold" }} >{`${props.date}`}</div>
                <div style={{ fontSize: "700%" }}>{`${props.city.main.temp}°`}<span className="main-temperature"></span></div>
                <div className="row">
                    <div className="col-md-4" style={{ fontWeight: "bold" }}>
                        <div style={{ fontSize: "150%" }}>Humidity</div>
                        <div style={{ fontSize: "125%" }}>{`${props.city.main.humidity} %`}</div>
                    </div>
                    <div className="col-md-4" style={{ fontWeight: "bold" }}>
                        <div style={{ fontSize: "150%" }}>Wind Speed</div>
                        <div style={{ fontSize: "125%" }}>{`${props.city.wind.speed} MPH`}</div>
                    </div>
                    <div className="col-md-4" style={{ fontWeight: "bold" }}>
                        <div style={{ fontSize: "150%" }}>UV Index</div>
                        <div style={{ fontSize: "125%" }}><span style={props.setUVColor()} className="border rounded-pill main-UV-Index">{props.uvIndex}</span></div>
                    </div>
                </div>

            </div>
            <div className="col-md-4">
                <h2 style={{ fontFamily: "Serif", fontSize: "400%" }}>{props.city.name}</h2>
                <img alt={props.city.name} style={{ width: "50%", height: "100%", marginTop: "-10%", display: "block", marginLeft: "auto", marginRight: "auto" }} src={`https://openweathermap.org/img/wn/${props.city.weather[0].icon}@2x.png`}></img>
            </div>
        </div>
    )
}

export default MainWeatherDisplay;