import { Request, Response } from 'express'
import { handleErrorResponse } from '../../utils/errorResponse'
import { loginUser, newUser } from './auth.service'

const register = async ({ body }: Request, res: Response) => {
  try {
    const registerUser = await newUser(body)
    res.status(200).send(registerUser)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

const login = async ({ body }: Request, res: Response) => {
  try {
    const user = await loginUser(body)
    res.status(200).send(user)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

export { register, login }
