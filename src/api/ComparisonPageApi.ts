import axios from "axios";
import { URL_ENERGY_COST_PREDICTION_PARAMS, URL_ENERGY_USAGE } from "./Urls";
import { PredictionParams, UserPredictionParams } from "../types/types";

export async function fetchAllPredictionParams(userId: number) {
    let predictionParams, usageMontly;
    const result = await Promise.allSettled([fetchEnergyCostPredictionParams(), fetchEnergyUsage(userId)]);
    if (result[0].status === 'fulfilled') {
        predictionParams = result[0].value;
    }
    if (result[1].status === 'fulfilled') {
        usageMontly = result[1].value;
    }
    return { predictionParams, usageMontly };
}

function fetchEnergyCostPredictionParams(): Promise<PredictionParams> {
    return axios.get(URL_ENERGY_COST_PREDICTION_PARAMS).then((response) => response.data).catch((e) => console.error("error fetching energy cost prediction params", e));
}

function fetchEnergyUsage(userId: number): Promise<UserPredictionParams> {
    return axios.get(URL_ENERGY_USAGE.replace(":userId", userId.toString())).then((response) => response.data).catch((e) => console.error("error fetching energy usage", e));
}
