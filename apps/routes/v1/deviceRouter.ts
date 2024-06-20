/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { type Express, type Request, type Response } from 'express'
import { middleware } from '../../middlewares'
import { DeviceController } from '../../controllers/devices'

export const deviceRouter = (app: Express) => {
  const router = express.Router()
  // app.use('/api/v1/devices', middleware.useAuthorization, router)
  app.use('/api/v1/devices', router)

  router.get(
    '/',
    async (req: Request, res: Response) => await DeviceController.findAll(req, res)
  )
  router.get(
    '/detail/:deviceId',
    async (req: Request, res: Response) => await DeviceController.findDetail(req, res)
  )
  router.post(
    '/',
    async (req: Request, res: Response) => await DeviceController.create(req, res)
  )
  router.patch(
    '/',
    async (req: Request, res: Response) => await DeviceController.update(req, res)
  )
  router.delete(
    '/',
    async (req: Request, res: Response) => await DeviceController.remove(req, res)
  )
}
