import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import request from "request-promise-native";

const mapStyles = {
    width: '100%',
    height: '100%'
};

const getSeason = (date) => {   
    const indexSeason =  Math.floor((date.getMonth() / 12 * 4)) % 4;
    return ['Verano', 'Otoño', 'Invierno', 'Primavera'][indexSeason]
}

const convertFahrenheitToCelsius = (fahrenheit) => {
    // (83 °F − 32) × 5/9 = 28.333 °C
    return Math.trunc((fahrenheit -32) * (5/9));
}

const getWeatherApi = async (lat, lng) => {

    const queryApi = `${process.env.REACT_APP_BACKEND}/${lat}/${lng}`;
    let jsonWeather;
    try {
        const response = await request.get( queryApi );
        if (typeof response === "undefined"){ throw new Error('Error al obtener data del tiempo.') }
        jsonWeather = JSON.parse(response);
    } catch (error) {
        throw error;
    }

    return jsonWeather;
}

const showWeather = async(event) => {
    let infoWeather;
    const lat = event.latLng.lat(); 
    const lng = event.latLng.lng();

    try {
        infoWeather = await getWeatherApi(lat, lng);
        const date = new Date(infoWeather.currently.time * 1000);
        const season = getSeason(date);
        const celcius = convertFahrenheitToCelsius(infoWeather.currently.temperature);
        
        alert(`La estación de '${infoWeather.timezone}' es '${season}', \ny su temperatura es de '${celcius}' ºC`)

    } catch (error) {
        console.log(error);
        
    }
}


const Map = (props) => {
    return (
        <GoogleMap
                onClick={(e) => showWeather(e)}
                defaultZoom={2}
                defaultOptions={{zoomControl:false, scrollwheel: false}}
                style={mapStyles}
                // scrollwheel={false}
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