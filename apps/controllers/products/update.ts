import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { requestChecker } from '../../utilities/requestCheker'
import { ProductsModel, type ProductsAttributes } from '../../models/products'

export const updateProduct = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as ProductsAttributes

  const emptyField = requestChecker({
    requireList: ['productId'],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const result = await ProductsModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        productId: { [Op.eq]: requestBody.productId }
      }
    })

    if (result == null) {
      const message = 'not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const newData: ProductsAttributes | any = {
      ...(requestBody.productName.length > 0 && {
        productName: requestBody.productName
      }),
      ...(requestBody.productDescription.length > 0 && {
        productDescription: requestBody.productDescription
      })
    }

    await ProductsModel.update(newData, {
      where: {
        deleted: { [Op.eq]: 0 },
        productId: { [Op.eq]: requestBody.productId }
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
