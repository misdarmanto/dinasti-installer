import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { TransactionsModel } from '../../models/transactions'
import { UserModel } from '../../models/user'
import { ProductsModel } from '../../models/products'

export const findTotal = async (req: any, res: Response): Promise<any> => {
  try {
    const totalProduct = await ProductsModel.count({
      where: {
        deleted: { [Op.eq]: 0 }
      }
    })

    const totalTransaction = await TransactionsModel.count({
      where: {
        deleted: { [Op.eq]: 0 }
      }
    })

    const totalUser = await UserModel.count({
      where: {
        deleted: { [Op.eq]: 0 }
      }
    })

    const response = ResponseData.default

    response.data = { totalProduct, totalTransaction, totalUser }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
