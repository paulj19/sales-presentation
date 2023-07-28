import { EnergyCostPredictionProps } from "../types/types";

export function getTotalEnpalCost(predictionProps: EnergyCostPredictionProps) {
    const year = predictionProps.year;
    const inflationRate = predictionProps.predictionParams.inflationRate;
    const fixedInitial = year < 13 ? 125 : 0;
    const totalCost = Math.ceil(fixedInitial + 10 + 5 * (1 + inflationRate) ** year);
    return totalCost;
}