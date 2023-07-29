import SolarCost from "./SolarCost";
import EnergyCostPredictionModal from "./EnergyCostComaprisonContainer";
import "./css/ComparisonPage.css";
import { createContext, useContext, useEffect, useId, useReducer, useState } from "react";
import { EnergyCostPredictionProps, PredictionParams, UserSpecificParams } from "../../types/types";
import { fetchAllPredictionParams as fetchAllPredictionParams } from "../../api/ComparisonPageApi";
import ComparisonChart from "./ComparisonChart";
import { getPredictedMonthlyTotalCost, getPredictedMonthlyUsageCost } from "../../util/EnergyCostCalculator";
import { getTotalSolarCost } from "../../util/SolarCostCalculator";

export let StateContext: any;
export default function ComparisonPage() {
  StateContext = createContext({});
  const [userId, setUserId] = useState<number>(123);
  const [year, setYear] = useState<number>(1);
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
  useEffect(() => {
    const getPredictionParams = async (userId: number) => {
      const { predictionParams, userSpecificParams } = await fetchAllPredictionParams(userId);
      let costPredictedAllYears = {};
      if (predictionParams && userSpecificParams) {
        for (let i = 0; i < 25; i += 5) {
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
      <StateContext.Provider value={state} >
        <div className="comparison-box">
          {state ?
            <ComparisonChart /> : null}
        </div>
        <div className="slider-container">
          <input type="range" name="year-selector" min={"0"} max={"25"} step={5} defaultValue={"0"} list="values" onChange={(e) => dispatch({ type: "UPDATE_YEAR", payload: e.target.value })} />
          <datalist id="values">
            <option value={"0"} label="0"></option>
            <option value={"5"} label="5"></option>
            <option value={"10"} label="10"></option>
            <option value={"15"} label="15"></option>
            <option value={"20"} label="20"></option>
            <option value={"25"} label="25"></option>
          </datalist>
        </div>
      </StateContext.Provider>
    </>
  );
}
