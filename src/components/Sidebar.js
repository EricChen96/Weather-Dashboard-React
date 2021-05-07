import {useState, useRef} from "react";

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
                <div class="row">
                    <div class="col-md-8">
                        <input type="text" ref={cityInput} class="form-control cities-search-input" placeholder="New York, Toronto..." />
                    </div>
                    <div class="col-md-2">
                        <button type="submit" class="btn btn-primary">Search</button>
                    </div>
                </div>
                <div class="cities-buttons-holder">
                </div>
            </form>
        </div>
    )
}

export default SideBar;