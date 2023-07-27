import WithSonar from "./WithSonar";
import EnergyCostPredictor from "./EnergyCostPredictor";
import "./ComparisonPage.css";
import { useEffect, useId, useState } from "react";
import { EnergyCostPredictionProps, PredictionParams, UserPredictionParams } from "../../types/types";
import { fetchAllPredictionParams as fetchAllPredictionParams } from "../../api/ComparisonPageApi";

export default function ComparisonPage() {
  const [userId, setUserId] = useState<number>(123);
  const [year, setYear] = useState<number>(1);
  const [userPredictionParams, setUserPredictionParams] = useState<UserPredictionParams>();//TODO show warning -> not set -> using avg/3000 kwh -> option to set
  const [predictionParams, setPredictionParams] = useState<PredictionParams>();
  useEffect(() => {
    const getPredictionParams = async (userId: number) => {
      const { predictionParams: predictionParams_, usageMontly: usageMontly_ } = await fetchAllPredictionParams(userId);
      if (predictionParams_) {
        setPredictionParams(predictionParams_);
      } else {
        //todo get from localStorage if exists ELSE show dialog to enter manually
      }
      if (usageMontly_) {
        setUserPredictionParams(usageMontly_);
      } else {
        //todo dialog to enter manually
      }
    }
    getPredictionParams(userId);
  }, [userId])


  return (
    <>
      <div className="comparison-box">
        <div className="without-sonar">
          {userPredictionParams && predictionParams ?
            <EnergyCostPredictor year={year} userPredictionParams={userPredictionParams} predictionParams={predictionParams} /> : null}
        </div>
        <div className="with-sonar">
          <WithSonar />
        </div>
      </div>
      <div className="slider-container">
        <input type="range" name="year-selector" min={"0"} max={"25"} step={5} defaultValue={"0"} list="values" onChange={(e) => setYear(Number(e.target.value))} />
        <datalist id="values">
          <option value={"0"} label="0"></option>
          <option value={"5"} label="5"></option>
          <option value={"10"} label="10"></option>
          <option value={"15"} label="15"></option>
          <option value={"20"} label="20"></option>
          <option value={"25"} label="25"></option>
        </datalist>
      </div>
    </>
  );
}
