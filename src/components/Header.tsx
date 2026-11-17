import type { ReactElement } from "react";
import homeIcon from "../assets/images/home_icon.png";
export default function Header(): ReactElement
{
    return(
        <header className="header">
            <h1>
                <img src="../logo.png" alt="Skyloom logo" className="logo"/>
                Skyloom
            </h1>
            <a href="#home" className="home-container">
                <img src={ homeIcon }alt="Home" className="home-icon"/>
                 Home
            </a>
        </header>
    )
}