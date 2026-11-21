
export interface WeatherData {
    temperature: number;
    humidity: number;
    wind: number;
    condition: string;
    city: string;
}

export async function getWeatherByCity(
    city: string
): Promise<WeatherData> {

    // Find city coordinates
    const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );

    if (!geoResponse.ok) {
        throw new Error("Unable to search for city.");
    }

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found! Please try another city.");
    }

    const location = geoData.results[0];

    // Fetch weather using latitude and longitude
    const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
    );

    if (!weatherResponse.ok) {
        throw new Error("Unable to fetch weather data.");
    }

    const weatherData = await weatherResponse.json();

    const current = weatherData.current;

    if (!current) {
        throw new Error("Weather information is unavailable.");
    }

    // Convert weather code into readable condition
    let condition = "Unknown";

    const code = current.weather_code;

    if (code === 0) condition = "Clear Sky";
    else if ([1, 2, 3].includes(code)) condition = "Partly Cloudy";
    else if ([45, 48].includes(code)) condition = "Foggy";
    else if ([51, 53, 55, 56, 57].includes(code)) condition = "Drizzle";
    else if ([61, 63, 65, 66, 67].includes(code)) condition = "Rainy";
    else if ([71, 73, 75, 77].includes(code)) condition = "Snowy";
    else if ([80, 81, 82].includes(code)) condition = "Rain Showers";
    else if ([85, 86].includes(code)) condition = "Snow Showers";
    else if ([95, 96, 99].includes(code)) condition = "Thunderstorm";

    return {
        temperature: current.temperature_2m,
        humidity: current.relative_humidity_2m,
        wind: current.wind_speed_10m,
        condition: condition,
        city: location.name
    };
}
