import { useContext } from "react";
import { EnergyCostPredictionProps } from "../../types/types";
import { getTotalSolarCost } from "../../util/SolarCostCalculator";
import { StateContext } from "./ComparisonPage";

export default function SolarCost() {
  const params: any = useContext(StateContext);
  const priceBase = params.priceBase;
  const year = params.year;
  const surplus = params.surplus;
  const solarCostTotal = params.costPredicted.solarCostTotal;
  const priceEnpalMonthly = params.costPredicted.solarCostMonthly;

  return (
    <div className="">
      <h1>Mit Enpal</h1>
      <div className=""><h2>{year < 20 ? priceEnpalMonthly + "€" : "0€"}</h2></div>
      <div className="cost-sum">
        <div className="cost-elements">
          <p>Grundgebühr</p>
          <p>{priceBase + "€"}</p>
        </div>
        <div className="cost-elements">
          <p>Überschuss</p>
          <p>{surplus + "€"}</p>
        </div>
        <div className="cost-elements">
          <p>Summe</p>
          <p>{solarCostTotal + "€"}</p>
        </div>
      </div>
    </div>
  )
}

