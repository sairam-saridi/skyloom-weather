import sunny from "../assets/weatherImages/sunny.svg"
export default function Weather()
{
    return (
        <div className="weather-container">
             <img src={sunny} alt="Sunny weather" />
        </div>

    )
}