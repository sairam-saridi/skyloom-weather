
import type { ReactElement } from "react";
import type { WeatherData } from "../services/weatherService";

import sunny from "../assets/weatherImages/sunny.svg";
import cloudy from "../assets/weatherImages/cloudy.svg";
import foggy from "../assets/weatherImages/foggy.svg";
import drizzle from "../assets/weatherImages/drizzle.svg";
import rainy from "../assets/weatherImages/rainy.svg";
import snowy from "../assets/weatherImages/snowy.svg";
import rainShowers from "../assets/weatherImages/rain-showers.svg";
import snowShowers from "../assets/weatherImages/snow-showers.svg";
import thunderstorm from "../assets/weatherImages/thunderstorm.svg";

import { icons } from "../icons";

interface WeatherProps {
    data: WeatherData | null;
    loading: boolean;
    error: string;
}

export default function Weather({
    data,
    loading,
    error
}: WeatherProps): ReactElement {


const weatherImages: Record<string, string> = {
    "Clear Sky": sunny,
    "Cloudy": cloudy,
    "Foggy": foggy,
    "Drizzle": drizzle,
    "Rainy": rainy,
    "Snowy": snowy,
    "Rain Showers": rainShowers,
    "Snow Showers": snowShowers,
    "Thunderstorm": thunderstorm
};

    return (
        <main className="weather-container">

            {loading ? (

                <p>Loading Weather...</p>

            ) : error ? (

                <p className="error">{error}</p>

            ) : data ? (

                <>
                    <section className="weather-image-section">
                        <img
                            src={weatherImages[data.condition] ?? sunny}
                            alt={`${data.condition} weather`}
                            className="weather-img"
                        />
                    </section>

                    <section className="weather-status">
                        <p className="temperature">
                            {Math.round(data.temperature)}°C
                        </p>

                        <p className="info">
                            {data.condition}
                        </p>

                        <p className="location">
                            {icons.location} {data.city}
                        </p>
                    </section>

                    <section className="weather-details">

                        <div className="humidity">
                            <div className="humidity-img">
                                {icons.humidity}
                            </div>

                            <div className="humidity-info">
                                <p>Humidity</p>
                                <p className="humidity-percent">
                                    {data.humidity}%
                                </p>
                            </div>
                        </div>

                        <div className="wind-details">
                            <div className="wind-img">
                                {icons.wind}
                            </div>

                            <div className="wind-info">
                                <p>Wind</p>
                                <p className="wind-speed">
                                    {data.wind} km/h
                                </p>
                            </div>
                        </div>

                    </section>
                </>

            ) : (

                <p>Search for a city to see its weather.</p>

            )}

        </main>
    );
}
