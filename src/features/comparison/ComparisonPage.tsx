import SolarCost from "./SolarCost";
import EnergyCostPredictionModal from "./EnergyCostComaprison";
import "./css/ComparisonPage.css";
import { createContext, useContext, useEffect, useId, useMemo, useReducer, useState } from "react";
import { EnergyCostPredictionProps, PredictionParams, UserSpecificParams } from "../../types/types";
import { fetchAllPredictionParams as fetchAllPredictionParams } from "../../api/ComparisonPageApi";
import ComparisonChart from "./ComparisonChart";
import { getPredictedMonthlyTotalCost, getPredictedMonthlyUsageCost } from "../../util/EnergyCostCalculator";
import { getTotalSolarCost } from "../../util/SolarCostCalculator";
import { stat } from "fs";
import Slider from "./Slider";

export let StateContext: any;
export default function ComparisonPage() {
  StateContext = createContext({});
  const [userId, setUserId] = useState<number>(123);
  const [year, setYear] = useState(0)

  const [state, dispatch] = useReducer((state: any, action: any) => {
    switch (action.type) {
      case "INIT_PREDICTION_PARAMS":
        return {
          ...action.payload
        }
      case "UPDATE_YEAR":
        return {
          ...state,
          year: action.payload
        }
    }
  }, null)

  const stateContext = useMemo(() => ({
    updateYear: (year: number) => dispatch({ type: "UPDATE_YEAR", payload: year })
  }), [])
  useEffect(() => {
    const getPredictionParams = async (userId: number) => {
      const { predictionParams, userSpecificParams } = await fetchAllPredictionParams(userId);
      let costPredictedAllYears = {};
      if (predictionParams && userSpecificParams) {
        for (let i = 0; i <= 25; i += 5) {
          const predictedMonthlyUsageCost = getPredictedMonthlyUsageCost({ year: i, userSpecificParams, predictionParams });
          const predictedMonthlyTotalCost = getPredictedMonthlyTotalCost({ year: i, userSpecificParams, predictionParams }, predictedMonthlyUsageCost);
          const solarCostTotal = getTotalSolarCost({ year: i, userSpecificParams, predictionParams });
          costPredictedAllYears = Object.assign({ [i]: { energyCostUsage: predictedMonthlyUsageCost, energyCostTotal: predictedMonthlyTotalCost, solarCostTotal: solarCostTotal } }, costPredictedAllYears);
        }
        dispatch({ type: "INIT_PREDICTION_PARAMS", payload: { ...predictionParams, ...userSpecificParams, costPredicted: costPredictedAllYears, year: 0 } })
      } else {
        // todo dialog to enter manually
      }
    }
    getPredictionParams(userId);
  }, [userId])


  // <div className="without-sonar">
  //   {userPredictionParams && predictionParams ?
  //     <EnergyCostPredictor year={year} userPredictionParams={userPredictionParams} predictionParams={predictionParams} /> : null}
  // </div>
  // <div className="with-sonar">
  //   <WithSonar />
  // </div>
  return (
    <>
      {state ?
        <StateContext.Provider value={{ state, stateContext }} >
          <div className="comparison-box">
            <ComparisonChart />
          </div>
        </StateContext.Provider>
        : null}
    </>
  );
}
