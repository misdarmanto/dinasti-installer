/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import express, { type Express, type Request, type Response } from 'express'
import { middleware } from '../../middlewares'
import { myProfileController } from '../../controllers/myProfile'

export const myProfileRouter = (app: Express) => {
  const router = express.Router()
  app.use('/api/v1/my-profile', middleware.useAuthorization, router)
  router.get(
    '/',
    async (req: Request, res: Response) => await myProfileController.find(req, res)
  )
  router.patch(
    '/',
    async (req: Request, res: Response) => await myProfileController.update(req, res)
  )
}
