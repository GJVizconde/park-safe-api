import { Request, Response } from 'express'
import { handleErrorResponse } from '../../utils/errorResponse'
import { getAllUsers } from './user.service'

const getUsers = async (req: Request, res: Response) => {
  try {
    console.log('Estoy en getUsersController')
    const users = await getAllUsers()
    res.status(200).send(users)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

export { getUsers }
