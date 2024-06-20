import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
// import { Op } from 'sequelize'
import { ResponseData } from '../../utilities/response'
import { type UserAttributes, UserModel } from '../../models/user'
import { requestChecker } from '../../utilities/requestCheker'
import { hashPassword } from '../../utilities/scure_password'
import { v4 as uuidv4 } from 'uuid'
// import { generateUniqueId } from '../../utilities/generateUniqueId'

export const userRegister = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as UserAttributes

  const emptyField = requestChecker({
    requireList: ['userName', 'userEmail', 'userPassword', 'userWhatsAppNumber'],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    // const user = await UserModel.findOne({
    //   raw: true,
    //   where: {
    //     deleted: { [Op.eq]: 0 },
    //     [Op.or]: [
    //       { userEmail: { [Op.eq]: requestBody.userEmail } },
    //       { userWhatsAppNumber: { [Op.eq]: requestBody.userWhatsAppNumber } }
    //     ]
    //   }
    // })

    // if (user != null) {
    //   const message = `Email ${requestBody.userEmail} atau WA ${requestBody.userWhatsAppNumber} sudah terdaftar. Silahkan gunakan yang lain.`
    //   const response = ResponseData.error(message)
    //   return res.status(StatusCodes.BAD_REQUEST).json(response)
    // }

    requestBody.userPassword = hashPassword(requestBody.userPassword)
    requestBody.userId = uuidv4()
    await UserModel.create(requestBody)

    const response = ResponseData.default
    response.data = { message: 'success' }
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
