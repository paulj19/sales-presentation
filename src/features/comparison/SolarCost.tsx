import { useContext } from "react";
import { EnergyCostPredictionProps } from "../../types/types";
import { getTotalSolarCost } from "../../util/SolarCostCalculator";
import { StateContext } from "./ComparisonPage";

export default function SolarCost({ year }) {
  const { state }: any = useContext(StateContext);
  const priceBase = state.priceBase;
  const surplus = state.surplus;
  const costSolarTotal = state.costPredicted[year].solarCostTotal;
  const costSolarFixed = state.priceEnpalMonthly;

  return (
    <div className="">
      <h1>Mit Enpal</h1>
      <div className=""><h2>{year < 20 ? costSolarFixed + "€" : "0€"}</h2></div>
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
          <p>{costSolarTotal + "€"}</p>
        </div>
      </div>
    </div>
  )
}

