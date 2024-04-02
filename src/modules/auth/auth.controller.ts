import { Request, Response } from 'express'
import { handleErrorResponse } from '../../utils/errorResponse'
import { loginUser, newUser } from './auth.service'

const register = async ({ body }: Request, res: Response) => {
  try {
    console.log('Body en controller', body)
    const registerUser = await newUser(body)
    res.status(200).send(registerUser)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

const login = async ({ body, query }: Request, res: Response) => {
  try {
    const { role } = query
    console.log('Body en controller', body, role)
    const user = await loginUser(body, role)
    res.status(200).send(user)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

export { register, login }
