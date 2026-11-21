import type { ReactElement } from "react";
import type { WeatherData } from "../services/weatherService.ts";

import sunny from "../assets/weatherImages/wind.svg";
import { icons } from "../icons.tsx";

interface weatherProps {
    data: WeatherData;
}

export default function Weather({data}:weatherProps): ReactElement {
    return (
        <main className="weather-container">
             <section className="weather-image-section">
                <img
                    src={sunny}
                    alt="Partly cloudy weather"
                    className="weather-img"
                />
            </section>
            <section className="weather-status">
                <p className="temperature"> {Math.round(data.temperature)}°C</p>
                <p className="info">{data.condition}</p>
                <p className="location">{icons.location} {data.city}</p>
            </section>
            
            <section className="weather-details">

                <div className="humidity">
                    <div className="humidity-img">{icons.humidity}</div>
                    <div className="humidity-info">
                        <p>Humidity</p>
                        <p className="humidity-percent">{data.humidity}</p>
                    </div>
                </div>

                <div className="wind-details">
                    <div className="wind-img">{icons.wind}</div>
                    <div className="wind-info">
                        <p>Wind</p>
                        <p className="wind-speed">{data.wind}</p>
                    </div>
                </div>

            </section>

        </main>
    );
}
