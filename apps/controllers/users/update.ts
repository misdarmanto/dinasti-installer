import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { requestChecker } from '../../utilities/requestCheker'
import { UserModel, type UserAttributes } from '../../models/user'

export const updateUser = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as UserAttributes

  const emptyField = requestChecker({
    requireList: ['userId'],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const result = await UserModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        userId: { [Op.eq]: requestBody.userId }
      }
    })

    if (result == null) {
      const message = 'user not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const newData: UserAttributes | any = {
      ...(requestBody?.userName?.length > 0 && {
        userName: requestBody?.userName
      }),
      ...(requestBody?.userPassword?.length > 0 && {
        userPassword: requestBody?.userPassword
      })
    }

    await UserModel.update(newData, {
      where: {
        deleted: { [Op.eq]: 0 },
        userId: { [Op.eq]: requestBody.userId }
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

export const updateUserCoin = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as UserAttributes

  const emptyField = requestChecker({
    requireList: ['userId'],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const user = await UserModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        userId: { [Op.eq]: requestBody.userId }
      }
    })

    if (user == null) {
      const message = 'user not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const response = ResponseData.default
    response.data = { message: 'success' }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
