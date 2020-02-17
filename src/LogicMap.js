import request from "request-promise-native";
import { Client } from "@googlemaps/google-maps-services-js";


export const showWeather = async(event) => {
    try {
        let lat = event.latLng.lat(); 
        let lng = event.latLng.lng();
        
        const resultReverseGeoCode = await getReverseGeocode(lat, lng);        
        const shortNameCountry = getShortNameCountry(resultReverseGeoCode);

        const { country, capital, time, temperature, cache } = await getWeatherApi(shortNameCountry);
        const season = getSeason(time);
        const celcius = convertFahrenheitToCelsius(temperature);

        console.log("cache: ", cache);
        alert(`La capital de '${country}' es '${capital}'.\nSu estación es '${season}', \ny su temperatura es de '${celcius}' ºC`)

    } catch (error) {
        console.log(error);
        alert(error);
    }
}

/**
 * 
 * @param {*} date 
 * Obtiene la estación del año a nivel mundial  
 */
const getSeason = (time) => {
    const date = new Date(time * 1000);
    const indexSeason =  Math.floor((date.getMonth() / 12 * 4)) % 4;
    return ['Verano', 'Otoño', 'Invierno', 'Primavera'][indexSeason]
}


/**
 * 
 * @param {*} fahrenheit 
 * Convierte grados Fahrenheit a Celsius
 */
const convertFahrenheitToCelsius = (fahrenheit) => {
    // (83 °F − 32) × 5/9 = 28.333 °C
    return Math.trunc((fahrenheit -32) * (5/9));
}


/**
 * 
 * @param {*} lat 
 * @param {*} lng 
 * Consulta a la API weather para obtener información alusiva al tiempo. Data cacheada.
 */
const getWeatherApi = async (shortNameCountry) => {

    const queryApi = `${process.env.REACT_APP_BACKEND}/clima/${shortNameCountry}`;
    let jsonWeather;
    try {
        const response = await request.get( queryApi);
        if (typeof response === "undefined"){ throw new Error('Error al obtener data del tiempo.') }
        jsonWeather = JSON.parse(response);
        return { temperature: jsonWeather.apiWeather.temperatura, time: jsonWeather.apiWeather.fechahora, country: jsonWeather.infoCountry.pais, capital: jsonWeather.infoCountry.capital, cache: jsonWeather.cache  };
    } catch (error) {
        throw error;
    }

}


/**
 * 
 * @param {*} lat 
 * @param {*} lng 
 * Obtiene información entendible por humanos a partir de coordenadas selecionadas en mapa
 */
const getReverseGeocode = async(lat, lng) => {

    const cliente = new Client({});
    try {
        const resultReverseGeoCode = await cliente.reverseGeocode({params: {latlng: [lat, lng], key: process.env.REACT_APP_API_KEY }});
        if (typeof resultReverseGeoCode === "undefined") { throw new Error('Error al obtener datos de Google Maps.') }
        return resultReverseGeoCode;
    } catch (error) {
        throw error;
    }

}


/**
 * 
 * @param {*} resultReverseGeoCode 
 * Obtiene el ShortName de un pais, ejemplo: Chile -> CL
 */
const getShortNameCountry = (resultReverseGeoCode) => {
    try {
        const resultados = resultReverseGeoCode.data.results;
        let short_name;
        
        resultados.filter(result => result.types.indexOf('country') !== -1 ).forEach(element => {
            element.address_components.filter(address => address.types.indexOf('country') !== -1).forEach(add => {            
                short_name = add.short_name;
            });
        });
        if (typeof short_name === "undefined") { throw new Error('Error al obtener datos del territorio.') }
        return short_name;
    } catch (error) {
        throw error;
    }
}