import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { requestChecker } from '../../utilities/requestCheker'
import { TransactionsModel, type TransactionsAttributes } from '../../models/transactions'

export const updateTransaction = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as TransactionsAttributes

  const emptyField = requestChecker({
    requireList: ['transactionId'],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const result = await TransactionsModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        transactionId: { [Op.eq]: requestBody.transactionId }
      }
    })

    if (result == null) {
      const message = 'transaction not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const newData: TransactionsAttributes | any = {
      // ...(requestBody.transactionProductId.length > 0 && {
      //   transactionProductId: requestBody.transactionProductId
      // }),
      // ...(requestBody.transactionPrice.toString().length > 0 && {
      //   transactionPrice: requestBody.transactionPrice
      // })
    }

    await TransactionsModel.update(newData, {
      where: {
        deleted: { [Op.eq]: 0 },
        transactionId: { [Op.eq]: requestBody.transactionId }
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
