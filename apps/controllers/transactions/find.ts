import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { Pagination } from '../../utilities/pagination'
import { requestChecker } from '../../utilities/requestCheker'
import { CONSOLE } from '../../utilities/log'
import { TransactionsAttributes, TransactionsModel } from '../../models/transactions'
import { ProductsModel } from '../../models/products'
import { TransactionItemsModel } from '../../models/transactionsItems'

export const findAllTransaction = async (req: any, res: Response): Promise<any> => {
  try {
    const page = new Pagination(
      parseInt(req.query.page) ?? 0,
      parseInt(req.query.size) ?? 10
    )

    const result = await TransactionsModel.findAndCountAll({
      where: {
        deleted: { [Op.eq]: 0 },
        ...(Boolean(req.query.search) && {
          [Op.or]: [{ transactionUser: { [Op.like]: `%${req.query.search}%` } }]
        })
      },
      attributes: [
        'transactionId',
        'transactionUser',
        'transactionPrice',
        'transactionChange',
        'transactionPayment',
        'createdAt'
      ],
      order: [['id', 'desc']],
      ...(req.query.pagination === 'true' && {
        limit: page.limit,
        offset: page.offset
      })
    })

    const response = ResponseData.default
    response.data = page.data(result)
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    CONSOLE.error(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}

export const findDetailTransaction = async (req: any, res: Response): Promise<any> => {
  const requestParams = req.params as TransactionsAttributes

  const emptyField = requestChecker({
    requireList: ['transactionId'],
    requestData: requestParams
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
        transactionId: { [Op.eq]: requestParams.transactionId }
      },
      include: [
        {
          model: TransactionItemsModel,
          attributes: [
            'transactionItemId',
            'transactionItemTransactionId',
            'transactionItemProductId',
            'transactionItemBasePrice',
            'transactionItemTotal',
            'transactionItemDiscount'
          ],
          as: 'transactionItems',
          include: [
            {
              model: ProductsModel,
              attributes: [
                'productId',
                'productBarcode',
                'productName',
                'productDescription',
                'productStock',
                'productPrice1',
                'productPrice2',
                'productPrice3',
                'productQty1',
                'productQty2',
                'productQty3'
              ]
            }
          ]
        }
      ]
    })

    if (result == null) {
      const message = 'not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const response = ResponseData.default
    response.data = result
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
