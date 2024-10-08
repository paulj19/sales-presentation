import { rest } from 'msw'
import { URL_ENERGY_COST_PREDICTION_PARAMS, URL_ENERGY_USAGE } from '../api/Urls';

export const handlers = [
    rest.get(URL_ENERGY_COST_PREDICTION_PARAMS, (req, res, ctx) => {
        return res(ctx.json({
            priceBase: 10,
            inflationRate: 0.05,
            priceCurrentAvgKwh: 0.40,
        }), ctx.status(200));
    }),
    rest.get(URL_ENERGY_USAGE, (req, res, ctx) => {
        return res(ctx.json({
            usageMonthly: 250,
        }), ctx.status(200));
    })
]