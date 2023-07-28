import React, { PureComponent, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EnergyCostPredictionProps } from '../../types/types';
import { getMonthlyPredictedCost, getTotalPredictedCost } from '../../util/EnergyCostCalculator';
import { getTotalEnpalCost } from '../../util/MitEnpalCostCalculator';
import Modal from 'react-modal';
import "./css/EnergyCostPredictor.css"

export default function ComparisonChart(predictionProps: EnergyCostPredictionProps) {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const year = predictionProps.year;
    let comparisonData = [];
    for (let i = 0; i <= 25; i += 5) {
        if (i > year) {
            comparisonData.push({ year: i + 2013 })
            continue
        }
        comparisonData.push({ year: i + 2013, Ohne_PV: getTotalPredictedCost({ ...predictionProps, year: i }), Mit_Enpal: getTotalEnpalCost({ ...predictionProps, year: i }) })
    }

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                contentLabel="Example Modal"
                onRequestClose={closeModal}
            >
                <EnergyCostPredictor {...predictionProps} />
            </Modal>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={comparisonData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    onClick={() => setModalOpen(true)}
                >
                    <CartesianGrid strokeDasharray="3 3" onClick={() => <EnergyCostPredictionModal {...predictionProps} />} />
                    <XAxis dataKey="year" />
                    <YAxis ticks={[0, 50, 100, 150, 200, 250, 300, 350]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Ohne_PV" stroke="#FF0000" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Mit_Enpal" stroke="green" />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
    function closeModal() {
        setModalOpen(false);
    }
    function EnergyCostPredictionModal(predictionProps: EnergyCostPredictionProps) {
        console.log("OOOO")
        return (
            <div className="prediction-main">
                <Modal
                    isOpen={isModalOpen}
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

}