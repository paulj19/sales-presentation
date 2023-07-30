import React, { PureComponent, useContext, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EnergyCostPredictionProps } from '../../types/types';
import { getPredictedMonthlyUsageCost, getPredictedMonthlyTotalCost } from '../../util/EnergyCostCalculator';
import { getTotalSolarCost } from '../../util/SolarCostCalculator';
import Modal from 'react-modal';
import "./css/EnergyCostPredictor.css"
import EnergyCostComaprison from './EnergyCostComaprison';
import { StateContext } from './ComparisonPage';
import Slider from './Slider';

export default function ComparisonChart() {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [year, setYear] = useState(0)
    const { state }: any = useContext(StateContext);

    let comparisonData = [];

    for (let i = 0; i <= 25; i += 5) {
        if (i > year) {
            comparisonData.push({ year: i + 2013 })
            continue
        }
        comparisonData.push({ year: i + 2013, Ohne_PV: state.costPredicted[i].energyCostTotal, Mit_Enpal: state.costPredicted[i].solarCostTotal })
    }

    function closeModal() {
        setModalOpen(false);
    }

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                contentLabel="Comparison Modal"
                onRequestClose={closeModal}
            >
                <EnergyCostComaprison year={year} setYear={setYear} />
            </Modal>
            <div className='graph-slider'>
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
                        <Line type="monotone" dataKey="Ohne_PV" stroke="#FF0000" activeDot={{ r: 8 }} label={CustomizedLabel} />
                        <Line type="monotone" dataKey="Mit_Enpal" stroke="green" label={CustomizedLabel} />
                    </LineChart>
                </ResponsiveContainer>
                <Slider year={year} setYear={setYear} />
            </div>
        </>
    );
}

function CustomizedLabel({ x, y, stroke, value }) {
    return (
        <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
            {value + "€"}
        </text>
    );
}