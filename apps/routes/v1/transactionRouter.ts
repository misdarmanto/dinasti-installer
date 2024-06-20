/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { middleware } from '../../middlewares'
import { TransactionController } from '../../controllers/transactions'

export const transactionRoutes = (app: Express) => {
  const router = express.Router()
  // app.use('/api/v1/transactions', middleware.useAuthorization, router)
  app.use('/api/v1/transactions', router)

  router.get(
    '/',
    async (req: Request, res: Response) => await TransactionController.findAll(req, res)
  )
  router.get(
    '/detail/:transactionId',
    async (req: Request, res: Response) => await TransactionController.findOne(req, res)
  )
  router.post(
    '/',
    async (req: Request, res: Response) => await TransactionController.create(req, res)
  )
  router.patch(
    '/',
    async (req: Request, res: Response) => await TransactionController.update(req, res)
  )
  router.delete(
    '/',
    async (req: Request, res: Response) => await TransactionController.remove(req, res)
  )
}
