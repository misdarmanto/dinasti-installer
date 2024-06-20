import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { requestChecker } from '../../utilities/requestCheker'
import { v4 as uuidv4 } from 'uuid'
import { TransactionsModel, type TransactionsAttributes } from '../../models/transactions'
import {
  TransactionItemsAttributes,
  TransactionItemsModel
} from '../../models/transactionsItems'

interface ITransactionItems {
  transactionItemTransactionId: string
  transactionItemProductId: string
  transactionItemBasePrice: number
  transactionItemTotal: number
  transactionItemDiscount: number
}

interface ITransaction {
  transactionId: string
  transactionUser: string
  transactionPrice: number
  transactionChange: number
  transactionPayment: number
  transactionItems: ITransactionItems[]
}

export const createTransaction = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as ITransaction

  // const emptyField = requestChecker({
  //   requireList: ['transactionProductId', 'transactionTotalItem', 'transactionPrice'],
  //   requestData: requestBody
  // })

  // if (emptyField.length > 0) {
  //   const message = `invalid request parameter! require (${emptyField})`
  //   const response = ResponseData.error(message)
  //   return res.status(StatusCodes.BAD_REQUEST).json(response)
  // }

  try {
    const transactionPayload: TransactionsAttributes | any = {
      transactionId: uuidv4(),
      transactionUser: requestBody.transactionUser,
      transactionPrice: requestBody.transactionPrice,
      transactionChange: requestBody.transactionChange,
      transactionPayment: requestBody.transactionPayment
    }

    await TransactionsModel.create(transactionPayload)

    const transactionItemPayload: TransactionItemsAttributes[] | any =
      requestBody.transactionItems.map((item: ITransactionItems) => {
        return { ...item, transactionItemTransactionId: transactionPayload.transactionId }
      })

    await TransactionItemsModel.bulkCreate(transactionItemPayload)

    const response = ResponseData.default
    const result = { message: 'success' }
    response.data = result
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
