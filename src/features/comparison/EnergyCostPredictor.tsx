import "./EnergyCostPredictor.css"
import type { EnergyCostPredictionProps } from "../../types/types";

export default function EnergyCostPredictor({ year, userPredictionParams: { usageMonthly }, predictionParams: { priceBase, inflationRate, priceCurrentAvgKwh } }: EnergyCostPredictionProps) {
  console.log(usageMonthly)
  const pricePredictedKwh: number = priceCurrentAvgKwh * (1 + inflationRate) ** year;
  const costMonthlyPredicted: number = Math.ceil(usageMonthly * pricePredictedKwh);
  const costTotal = priceBase + costMonthlyPredicted;
  return (
    <div className="prediction-main">
      <h1>{"Ohne Enpal"}</h1>
      <div className="price-prediction">{`Ihre Strom kosten nach ${year} jahr: ` + `${priceBase}€(grundbehühr) +` + costMonthlyPredicted + `€(gebrauch) = ${costTotal}€`}</div>
    </div>
  )
}
