import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import { showWeather } from "./LogicMap";

const mapStyles = {
    width: '100%',
    height: '100%'
};


const Map = (props) => {
    return (
        <GoogleMap
                onClick={(e) => showWeather(e)}
                defaultZoom={3}
                defaultOptions={{zoomControl:false, scrollwheel: false}}
                style={mapStyles}
                defaultCenter={{ lat: 10.8544362, lng: -11.6068365 }}
        >
        </GoogleMap>
    );
}

export default withScriptjs (
    withGoogleMap(
        Map
    )
)