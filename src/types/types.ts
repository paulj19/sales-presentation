export type PredictionParams = {
    priceBase: number;
    inflationRate: number;
    priceCurrentAvgKwh: number;
}

export type EnergyCostPredictionProps = {
    year: number;
    userPredictionParams: UserPredictionParams;
    predictionParams: PredictionParams;
}

export type UserPredictionParams = {
    usageMonthly: number;
}