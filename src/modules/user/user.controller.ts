import { Request, Response } from 'express'
import { handleErrorResponse } from '../../utils/errorResponse'
import { getAllUsers } from './user.service'

const getUsers = async ({ query }: Request, res: Response) => {
  const { userId, ticket } = query

  try {
    console.log('Estoy en getUsersController')
    const users = await getAllUsers(Number(userId), Boolean(ticket))
    res.status(200).send(users)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

export { getUsers }
