
import { useState } from "react";
import type { ReactElement, FormEvent } from "react";

import { icons } from "../icons";

interface SearchbarProps {
    onSearch: (city: string) => void;
}

export default function Searchbar({
    onSearch
}: SearchbarProps): ReactElement {

    const [city, setCity] = useState("");

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (city.trim()) {
            onSearch(city.trim());
        }
    }

    return (
        <form className="search-container" onSubmit={handleSubmit}>

            <button
                type="submit"
                className="search-icon"
                aria-label="Search weather"
            >
                {icons.search}
            </button>

            <input
                type="text"
                className="searchbar"
                placeholder="Search for a city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />

        </form>
    );
}
