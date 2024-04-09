import { Request, Response } from 'express'
import { handleErrorResponse } from '../../utils/errorResponse'
import { getAllUsers } from './user.service'

const getUsers = async ({ query }: Request, res: Response) => {
  const { userId, ticket, hasVehicle } = query

  try {
    const users = await getAllUsers(Number(userId), String(ticket), String(hasVehicle))
    res.status(200).send(users)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

export { getUsers }
