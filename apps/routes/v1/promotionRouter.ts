/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { middleware } from '../../middlewares'
import { PromotionController } from '../../controllers/promotion'

export const promotionRouter = (app: Express) => {
  const router = express.Router()
  app.use('/api/v1/promotions', middleware.useAuthorization, router)

  router.get(
    '/',
    async (req: Request, res: Response) => await PromotionController.findAll(req, res)
  )
  router.get(
    '/detail/:promotionId',
    async (req: Request, res: Response) => await PromotionController.findOne(req, res)
  )
  router.post(
    '/',
    async (req: Request, res: Response) => await PromotionController.create(req, res)
  )
  router.patch(
    '/',
    async (req: Request, res: Response) => await PromotionController.update(req, res)
  )
  router.delete(
    '/',
    async (req: Request, res: Response) => await PromotionController.remove(req, res)
  )
}
