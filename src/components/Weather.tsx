
import sunny from "../assets/weatherImages/wind.svg";
import { icons } from "../icons.tsx";

export default function Weather() {
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
                <p className="temperature">24°c</p>
                <p className="info">Partly Cloudy</p>
                <p className="location">{icons.location} New York, USA</p>
            </section>
            
            <section className="weather-details">

                <div className="humidity">
                    <div className="humidity-img">{icons.humidity}</div>
                    <div className="humidity-info">
                        <p>Humidity</p>
                        <p className="humidity-percent">62%</p>
                    </div>
                </div>

                <div className="wind-details">
                    <div className="wind-img">{icons.wind}</div>
                    <div className="wind-info">
                        <p>Wind</p>
                        <p className="wind-speed">14 km/h</p>
                    </div>
                </div>

            </section>

        </main>
    );
}
