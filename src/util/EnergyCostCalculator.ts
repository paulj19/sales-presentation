import { EnergyCostPredictionProps } from "../types/types";

export function getTotalPredictedCost(predictionProps: EnergyCostPredictionProps): number {
    const costTotal = predictionProps.predictionParams.priceBase + getMonthlyPredictedCost(predictionProps);
    return costTotal;
}

export function getMonthlyPredictedCost({ year, userPredictionParams: { usageMonthly }, predictionParams: { inflationRate, priceCurrentAvgKwh } }: EnergyCostPredictionProps): number {
    const pricePredictedKwh: number = priceCurrentAvgKwh * (1 + inflationRate) ** year;
    const costMonthlyPredicted: number = Math.ceil(usageMonthly * pricePredictedKwh);
    return costMonthlyPredicted;
}