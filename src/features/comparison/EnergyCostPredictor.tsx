import { useContext } from "react";
import { StateContext } from "./ComparisonPage";

export function EnergyCostPredictor({ year }) {
    const { state }: any = useContext(StateContext);
    const priceBase = state.priceBase;
    const costMonthly = state.costPredicted[year].energyCostUsage;
    const costTotal = state.costPredicted[year].energyCostTotal;
    return (
        <div className="price-prediction">
            <div className=""><h1>{year === 1 ? `Ihre akutall Stromkosten` : `Ihre Strom kosten nach ${year} jahr: `}</h1></div>
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
