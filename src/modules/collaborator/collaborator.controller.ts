import { Request, Response } from 'express'
import { handleErrorResponse } from '../../utils/errorResponse'
import { getAllCollaborators, newCollaborator } from './collaborator.service'

const getCollaborators = async (req: Request, res: Response) => {
  try {
    console.log('Estoy en getUsersController')
    const collaborators = await getAllCollaborators()
    res.status(200).send(collaborators)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

const registerCollaborator = async ({ body }: Request, res: Response) => {
  try {
    console.log('Body en controller', body)
    const registerUser = await newCollaborator(body)
    res.status(200).send(registerUser)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

export { getCollaborators, registerCollaborator }
