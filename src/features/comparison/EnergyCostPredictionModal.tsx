import "./css/EnergyCostPredictor.css"
import type { EnergyCostPredictionProps } from "../../types/types";
import { getMonthlyPredictedCost, getTotalPredictedCost } from "../../util/EnergyCostCalculator";
import Modal from 'react-modal';
export default function EnergyCostPredictionModal(predictionProps: EnergyCostPredictionProps) {
  console.log("OOOO")
  return (
    <div className="prediction-main">
      <Modal
        isOpen={true}
        contentLabel="Example Modal"
      >
        <EnergyCostPredictor {...predictionProps} />
      </Modal>
    </div>
  )
}

function EnergyCostPredictor(predictionProps: EnergyCostPredictionProps) {
  const priceBase = predictionProps.predictionParams.priceBase;
  const year = predictionProps.year;
  const costMonthly = getMonthlyPredictedCost(predictionProps);
  const costTotal = getTotalPredictedCost(predictionProps);
  return (
    <div>
      <div className=""><h1>{year === 0 ? `Ihre akutall Stromkosten` : `Ihre Strom kosten nach ${year} jahr: `}</h1></div>
      <div className="cost-sum">
        <div className="cost-elements">
          <p>Grundgebühr</p>
          <p>{priceBase + "€"}</p>
        </div>
        <div className="cost-elements">
          <p>Stromverbrauch</p>
          <p>{costMonthly + "€"}</p>
        </div>
        <div className="cost-elements">
          <p>Summe</p>
          <p>{costTotal + "€"}</p>
        </div>
      </div>
    </div>
  )
}
