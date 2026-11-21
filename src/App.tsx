import { useState } from "react";
import type { ReactElement } from "react";
import Header from "./components/Header"
import Searchbar from "./components/Searchbar";
import Weather from "./components/Weather";
import { getWeatherByCity, type WeatherData } from "./services/weatherService";
export default function App(): ReactElement{
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState("");

    async function searchWeather(city: string) {
        try {
            setLoading(true);
            setError("");
            const data = await getWeatherByCity(city)
            setWeather(data);
        }
        catch(err)
        {
            setWeather(null);
            setError(
                err instanceof Error ? err.message : "Something went wrong!"
            );
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <>
            <Header />
            <Searchbar onSearch={searchWeather} />
            {loading && <p>Loading Weather...</p>}
            {error && <p className="error">{error}</p>}
            {weather && <Weather data={weather}/>}
        </>
    );
}