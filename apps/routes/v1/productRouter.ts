/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { ProductController } from '../../controllers/products'
import { middleware } from '../../middlewares'

export const productRoutes = (app: Express) => {
  const router = express.Router()
  // app.use('/api/v1/products', middleware.useAuthorization, router)

  app.use('/api/v1/products', router)

  router.get(
    '/',
    async (req: Request, res: Response) => await ProductController.findAll(req, res)
  )
  router.get(
    '/detail/:productId',
    async (req: Request, res: Response) => await ProductController.findOne(req, res)
  )
  router.post(
    '/',
    async (req: Request, res: Response) => await ProductController.create(req, res)
  )
  router.patch(
    '/',
    async (req: Request, res: Response) => await ProductController.update(req, res)
  )
  router.delete(
    '/',
    async (req: Request, res: Response) => await ProductController.remove(req, res)
  )
}
