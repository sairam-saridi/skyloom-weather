import type { ReactElement } from "react";
import Header from "./components/Header"
import Searchbar from "./components/Searchbar";
export default function App(): ReactElement{
    return (
        <>
            <Header />
            <Searchbar/>
        </>
    );
}