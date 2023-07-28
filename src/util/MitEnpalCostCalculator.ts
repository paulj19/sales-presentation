import { EnergyCostPredictionProps } from "../types/types";

export function getTotalEnpalCost(predictionProps: EnergyCostPredictionProps) {
    const year = predictionProps.year;
    const fixedInitial = year < 25 ? 105 : 0;
    const totalCost = fixedInitial + 10 + 1 * (1 + 0.0005) ** year;
    return totalCost;
}