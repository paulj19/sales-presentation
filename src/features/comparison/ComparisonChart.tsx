import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EnergyCostPredictionProps } from '../../types/types';
import { getTotalPredictedCost } from '../../util/EnergyCostCalculator';
import { getTotalEnpalCost } from '../../util/MitEnpalCostCalculator';

export default function ComparisonChart(predictionProps: EnergyCostPredictionProps) {
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
                <XAxis dataKey="year" />
                <YAxis ticks={[0, 50, 100, 150, 200, 250, 300, 350]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Ohne_PV" stroke="#FF0000" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Mit_Enpal" stroke="green" />
            </LineChart>
        </ResponsiveContainer>
    );
}
