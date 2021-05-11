function FiveDayForcast(props) {
    return (
        <div className="row">
            <div className="card-body">
                <h2 className="five-day-forcast-title">5-Day Forcast</h2>
                <div className="row five-day-forcast-body" style={{ margin: "auto" }}>
                    {props.fiveDayForcast.map(dailyForcast => (
                        <div className="forcast-container" style={{ width: "20%" }}>
                            <div>{dailyForcast.date}</div>
                            <img src={dailyForcast.iconUrl} alt={dailyForcast.date}></img>
                            <div>{dailyForcast.temperature}</div>
                            <div>{dailyForcast.humidity}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FiveDayForcast;