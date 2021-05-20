function FiveDayForcast(props) {
    return (
        <div className="row" style={{ borderStyle: "solid" }}>
            <div className="card-body">
                <div className="row " style={{ margin: "auto" }}>
                    {props.fiveDayForcast.map(dailyForcast => (
                        <div style={{ width: "20%", textAlign: "center", }} key={dailyForcast.date}>
                            <div style={{ fontSize: "150%", fontWeight: "bold" }}>{dailyForcast.date}</div>
                            <img style={{ width: "40%" }} src={dailyForcast.iconUrl} alt={dailyForcast.date}></img>
                            <div style={{ fontSize: "125%" }}>{dailyForcast.temperature}</div>
                            <div style={{ fontSize: "125%" }}>{dailyForcast.humidity}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FiveDayForcast;