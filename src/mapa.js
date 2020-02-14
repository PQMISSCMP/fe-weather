import React from "react";
// import axios from "axios";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import request from "request-promise-native";


const mapStyles = {
    width: '100%',
    height: '100%'
};


async function handleClick(event) {
    const lat = event.latLng.lat(); 
    const lng = event.latLng.lng();

    const headers = {
        'key-weather': '60d8e25b9dff3cc72dcfae493885e233',
        'Access-Control-Allow-Origin': true
    }
    const queryApi = `http://localhost:8000/clima/${lat}/${lng}`;
    
    let infoWeather;
    try {
        // infoWeather = await axios.get(queryApi, { headers })
        infoWeather = await request.get(queryApi, { headers })

    } catch (error) {
        console.log("erroraxios:", error);
        
    }
    console.log(
        infoWeather
    );
    
    alert('el clima es: nublado');
}


const Map = (props) => {
    return (
        <GoogleMap
                onClick={(e) => handleClick(e)}
                defaultZoom={2}
                defaultOptions={{zoomControl:false}}
                style={mapStyles}
                scrollwheel={false}
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