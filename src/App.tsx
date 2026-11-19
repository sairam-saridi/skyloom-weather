import type { ReactElement } from "react";
import Header from "./components/Header"
import Searchbar from "./components/Searchbar";
import Weather from "./components/Weather";
export default function App(): ReactElement{
    return (
        <>
            <Header />
            <Searchbar/>
            <Weather />
        </>
    );
}