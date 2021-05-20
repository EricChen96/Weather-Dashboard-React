import { useRef } from "react";

function SideBar(props) {
    const cityInput = useRef("");

    const handleSubmit = (event) => {
        event.preventDefault();
        props.searchCity(cityInput.current.value);
        cityInput.current.value="";
    }

    return (
        <div >
            <form onSubmit={handleSubmit} style={{ marginLeft: "10%" }}>
                <label htmlFor="cities-search-input" style={{fontSize:"125%"}}>Search City</label>
                <div className="row">
                    <div className="col-md-8">
                        <input type="text" ref={cityInput} className="form-control cities-search-input" placeholder="New York, Toronto..." />
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                </div>

            </form>
            <div className="cities-buttons-holder">
                {props.citiesButtons.map(city => (
                    <div key={city} style={{marginLeft:"10%"}}>
                        <button className="btn btn-primary col-7 mt-2" onClick={() => props.searchCity(city)}>{city}</button>
                        <button onClick={() => props.removeCitySearchHistorySingle(city)} className="btn btn-primary col-3 mt-2" style={{ marginLeft: "5px" }}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SideBar;