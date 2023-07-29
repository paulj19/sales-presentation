import React, { PureComponent, useContext, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EnergyCostPredictionProps } from '../../types/types';
import { getPredictedMonthlyUsageCost, getPredictedMonthlyTotalCost } from '../../util/EnergyCostCalculator';
import { getTotalSolarCost } from '../../util/SolarCostCalculator';
import Modal from 'react-modal';
import "./css/EnergyCostPredictor.css"
import EnergyCostComaprison from './EnergyCostComaprisonContainer';
import { StateContext } from './ComparisonPage';

export default function ComparisonChart() {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    let comparisonData = [];
    const params: any = useContext(StateContext);
    console.log("XXXOOO", params)

    for (let i = 0; i <= 25; i += 5) {
        if (i > params.year) {
            comparisonData.push({ year: i + 2013 })
            continue
        }
        comparisonData.push({ year: i + 2013, Ohne_PV: params.costPredicted[i].energyCostTotal, Mit_Enpal: params.costPredicted[i].solarCostTotal })
    }

    function closeModal() {
        setModalOpen(false);
    }

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                contentLabel="Example Modal"
                onRequestClose={closeModal}
            >
                <EnergyCostComaprison />
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
                    <CartesianGrid strokeDasharray="3 3" />
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
}