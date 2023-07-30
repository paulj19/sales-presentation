import "./css/EnergyCostPredictor.css"
import SolarCost from "./SolarCost";
import { EnergyCostPredictor } from "./EnergyCostPredictor";
import Slider from "./Slider";
import { useState } from "react";

export default function EnergyCostComaprison(props: any) {
  return (
    <div>
      <div className="comparisoin-main">
        <EnergyCostPredictor year={props.year} />
        <SolarCost year={props.year} />
      </div>
      <Slider year={props.year} setYear={props.setYear} />
    </div>
  )
}

