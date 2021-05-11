import {useRef} from "react";

function SideBar(props) {
    const cityInput = useRef("");

    const handleSubmit = (event) => {
        event.preventDefault();
        props.searchCity(cityInput.current.value);
    }

    return (
        <div>
            <form  onSubmit={handleSubmit}>
                <label for="cities-search-input">Search Term</label>
                <div className="row">
                    <div className="col-md-8">
                        <input type="text" ref={cityInput} className="form-control cities-search-input" placeholder="New York, Toronto..." />
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                </div>
                <div className="cities-buttons-holder">
                    {props.cityButtons > 0 && 
                        <div>

                        </div>
                    }
                </div>
            </form>
        </div>
    )
}

export default SideBar;