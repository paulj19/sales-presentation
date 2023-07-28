import "./EnergyCostPredictor.css"
import type { EnergyCostPredictionProps } from "../../types/types";
import { getMonthlyPredictedCost, getTotalPredictedCost } from "../../util/EnergyCostCalculator";

export default function EnergyCostPredictor(predictionProps: EnergyCostPredictionProps) {
  const year: number = predictionProps.year;
  const priceBase: number = predictionProps.predictionParams.priceBase;
  const costMonthlyPredicted: number = getMonthlyPredictedCost(predictionProps);
  const costTotal = getTotalPredictedCost(predictionProps);
  return (
    <div className="prediction-main">
      <p>{""}</p>
      <div className="price-prediction">{`Ihre Strom kosten nach ${year} jahr: ` + `${priceBase}€(grundbehühr) +` + costMonthlyPredicted + `€(gebrauch) = ${costTotal}€`}</div>
    </div>
  )
}
