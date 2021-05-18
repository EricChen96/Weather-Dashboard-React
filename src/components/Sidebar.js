import { useRef } from "react";

function SideBar(props) {
    const cityInput = useRef("");

    const handleSubmit = (event) => {
        event.preventDefault();
        props.searchCity(cityInput.current.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} style={{marginLeft: "5px"}}>
                <label for="cities-search-input">Search City</label>
                <div className="row">
                    <div className="col-md-8">
                        <input type="text" ref={cityInput} className="form-control cities-search-input" placeholder="New York, Toronto..." />
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                </div>
                <div className="cities-buttons-holder">
                    {props.citiesButtons.map(city => (
                        <button className="btn btn-primary col-12 mx-auto mt-2 cities-button" onClick={() => props.searchCity(city)}>{city}</button>
                    ))}
                </div>
            </form>
        </div>
    )
}

export default SideBar;