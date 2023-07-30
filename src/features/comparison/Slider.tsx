import { useContext, useState } from "react";
import "./css/ComparisonPage.css";
import { StateContext } from "./ComparisonPage";

export default function Slider({ year, setYear }) {
    return (
        <div className="slider-container">
            <input type="range" name="year-selector" min={"0"} max={"25"} step={"5"} list="values" value={year} onChange={(e) => setYear(e.target.value)} />
            <datalist id="values">
                <option>0</option>
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>25</option>
            </datalist>
        </div>
    )
}