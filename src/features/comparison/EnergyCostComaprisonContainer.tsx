import "./css/EnergyCostPredictor.css"
import type { EnergyCostPredictionProps } from "../../types/types";
import { getPredictedMonthlyTotalCost, getPredictedMonthlyUsageCost } from "../../util/EnergyCostCalculator";
import SolarCost from "./SolarCost";
import { useContext } from "react";
import { StateContext } from "./ComparisonPage";

export default function EnergyCostComaprison() {
  return (
    <div className="comparisoin-main">
      <EnergyCostPredictor />
      <SolarCost />
    </div>
  )
}

function EnergyCostPredictor() {
  const params: any = useContext(StateContext);
  const priceBase = params.priceBase;
  const year = params.year;
  const costMonthly = params.costPredicted.energyCostMonthly;
  const costTotal = params.costPredicted.energyCostTotal;
  return (
    <div className="price-prediction">
      <div className=""><h1>{year === 1 ? `Ihre akutall Stromkosten` : `Ihre Strom kosten nach ${year} jahr: `}</h1></div>
      <div className="cost-sum">
        <div className="cost-elements">
          <p>Grundgebühr</p>
          <p>{priceBase + "€"}</p>
        </div>
        <div className="cost-elements">
          <p>Stromverbrauch</p>
          <p>{costMonthly + "€"}</p>
        </div>
        <div className="cost-elements">
          <p>Summe</p>
          <p>{costTotal + "€"}</p>
        </div>
      </div>
    </div>
  )
}
