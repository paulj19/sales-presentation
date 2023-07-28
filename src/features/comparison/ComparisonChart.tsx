import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EnergyCostPredictionProps } from '../../types/types';
import { getTotalPredictedCost } from '../../util/EnergyCostCalculator';
import { getTotalEnpalCost } from '../../util/MitEnpalCostCalculator';

const data = [
    {
        name: 'heute',
        Ohne_PV: 100,
        Mit_Enpal: 150,
    },
    {
        name: '5',
        Ohne_PV: 150,
        Mit_Enpal: 155,
    },
    {
        name: '10',
        Ohne_PV: 200,
        Mit_Enpal: 160,
    },
    {
        name: '15',
        Ohne_PV: 250,
        Mit_Enpal: 165,
    },
    {
        name: '20',
        Ohne_PV: 300,
        Mit_Enpal: 170,
    },
    {
        name: '25',
        Ohne_PV: 350,
        Mit_Enpal: 3,
    }
];

export default function ComparisonChart(predictionProps: EnergyCostPredictionProps) {
    const year = predictionProps.year;
    let comparisonData = [];
    for (let i = 0; i <= year; i += 5) {
        comparisonData.push({ name: i, Ohne_PV: getTotalPredictedCost({ ...predictionProps, year: i }), Mit_Enpal: getTotalEnpalCost({ ...predictionProps, year: i }) })
    }
    console.log(JSON.stringify(comparisonData))

    return (
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
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, "auto"]} tickCount={6} />
                <YAxis type="number" domain={[0, "auto"]} tickCount={10} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Ohne_PV" stroke="#FF0000" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Mit_Enpal" stroke="#0095FF" />
            </LineChart>
        </ResponsiveContainer>
    );
}
