import { icons } from "../icons.tsx"
import type { ReactElement } from "react"
export default function Searchbar():ReactElement
{
    return(
        <div className="search-container">
            <button type="button" className="search-icon">{icons.search}</button>
            <input type="text" className="searchbar" placeholder="Search for a city..."/>
        </div>
    )
}