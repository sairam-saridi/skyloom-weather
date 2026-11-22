
import { useState, useEffect } from "react";
import type { ReactElement } from "react";

import Header from "./components/Header";
import Searchbar from "./components/Searchbar";
import Weather from "./components/Weather";

import {
    getWeatherByCity,
    type WeatherData
} from "./services/weatherService";

// Weather backgrounds
import sunnyBg from "./assets/backgroundImages/sunny.jpeg";
import cloudyBg from "./assets/backgroundImages/cloudy.jpeg";
import rainyBg from "./assets/backgroundImages/rainny.jpeg";
import snowyBg from "./assets/backgroundImages/snow.jpeg";

// Time-based backgrounds
import morningBg from "./assets/backgroundImages/early_morning.jpeg";
import afternoonBg from "./assets/backgroundImages/afternoon.jpeg";
import eveningBg from "./assets/backgroundImages/evening.jpeg";
import nightBg from "./assets/backgroundImages/night.jpeg";

export default function App(): ReactElement {

    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Track current local time
    const [currentHour, setCurrentHour] = useState(
        new Date().getHours()
    );

    useEffect(() => {

        const timer = window.setInterval(() => {
            setCurrentHour(new Date().getHours());
        }, 60000);

        return () => window.clearInterval(timer);

    }, []);

    // Search weather by city
    async function searchWeather(city: string) {

        try {
            setLoading(true);
            setError("");

            const data = await getWeatherByCity(city);

            setWeather(data);

        } catch (err) {

            setWeather(null);

            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong!"
            );

        } finally {
            setLoading(false);
        }
    }

    // First: Select background according to time
    let backgroundImage = nightBg;

    if (currentHour >= 5 && currentHour < 12) {
        backgroundImage = morningBg;
    }
    else if (currentHour >= 12 && currentHour < 17) {
        backgroundImage = afternoonBg;
    }
    else if (currentHour >= 17 && currentHour < 20) {
        backgroundImage = eveningBg;
    }

    // Second: Weather conditions override time backgrounds
    const condition = weather?.condition
        .toLowerCase()
        .replace(/[\s_-]/g, "") ?? "";

    if (condition === "sunny" || condition === "clearsky") {
        backgroundImage = sunnyBg;
    }
    else if (
        condition === "cloudy" ||
        condition === "partlycloudy"
    ) {
        backgroundImage = cloudyBg;
    }
    else if (
        ["rainy", "drizzle", "rainshowers", "thunderstorm"].includes(condition)
    ) {
        backgroundImage = rainyBg;
    }
    else if (
        ["snowy", "snowshowers"].includes(condition)
    ) {
        backgroundImage = snowyBg;
    }

    return (
        <div
            className="app-container"
            style={{
                backgroundImage: `
                    linear-gradient(
                        rgba(10, 20, 40, 0.25),
                        rgba(10, 20, 40, 0.40)
                    ),
                    url(${backgroundImage})
    `
}}
        >

            <Header />

            <Searchbar onSearch={searchWeather} />

            <Weather
                data={weather}
                loading={loading}
                error={error}
            />

        </div>
    );
}
