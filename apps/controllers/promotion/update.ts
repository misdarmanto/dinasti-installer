import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { requestChecker } from '../../utilities/requestCheker'
import { PromotionsModel, type PromotionAttributes } from '../../models/promotions'

export const updatePromotion = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as PromotionAttributes

  const emptyField = requestChecker({
    requireList: ['promotionId'],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const result = await PromotionsModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        promotionId: { [Op.eq]: requestBody.promotionId }
      }
    })

    if (result == null) {
      const message = 'promotion not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const newData: PromotionAttributes | any = {
      ...(requestBody.promotionProductId.length > 0 && {
        promotionProductId: requestBody.promotionProductId
      })
    }

    await PromotionsModel.update(newData, {
      where: {
        deleted: { [Op.eq]: 0 },
        promotionId: { [Op.eq]: requestBody.promotionId }
      }
    })

    const response = ResponseData.default
    response.data = { message: 'success' }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
