/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import express, { type Express, type Request, type Response } from 'express'
import { middleware } from '../../middlewares'
import { statisticController } from '../../controllers/statistic'

export const statisticRouters = (app: Express) => {
  const router = express.Router()
  app.use('/api/v1/statistic', router)
  router.get(
    '/total',
    async (req: Request, res: Response) => await statisticController.findTotal(req, res)
  )
}
