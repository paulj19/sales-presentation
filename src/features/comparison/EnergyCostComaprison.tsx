import "./css/EnergyCostPredictor.css"
import SolarCost from "./SolarCost";
import { EnergyCostPredictor } from "./EnergyCostPredictor";
import Slider from "./Slider";
import PriceComparisonBarChart from "./PriceComparisonChart";
import TotalCostSavings from "./TotalCostSavings";

export default function EnergyCostComaprison(props: any) {
  return (
    <div className="comparison-container">
      <div className="comparison-section">
        <EnergyCostPredictor year={props.year} />
        <PriceComparisonBarChart year={props.year} />
        <SolarCost year={props.year} />
      </div>
      <TotalCostSavings year={props.year} />
      <div className="slider">
        <Slider year={props.year} setYear={props.setYear} />
      </div>
    </div>
  )
}
