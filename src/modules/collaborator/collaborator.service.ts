import { prisma } from '../prisma'
import { handleError } from '../../utils/errorResponse'
import { User } from '../user/user.interface'

const getAllCollaborators = async () => {
  try {
    const users = await prisma.collaborator.findMany({})
    return users
  } catch (error) {
    handleError(error, 'ERROR_GET_USERS')
  }
}

const newCollaborator = async (body: User) => {
  try {
    const collaborator = await prisma.collaborator.findFirst({
      where: {
        id: Number(body.id)
      }
    })

    if (collaborator) throw new Error('User already exist')

    const isEmailExist = await prisma.collaborator.findFirst({
      where: {
        email: body.email
      }
    })

    if (isEmailExist) throw new Error('Email already registered')

    const newCollaborator = await prisma.collaborator.create({
      data: {
        ...body,
        id: Number(body.id)
      }
    })

    return newCollaborator
  } catch (error) {
    handleError(error, 'ERROR_REGISTER_NEW_USER')
  }
}

export { getAllCollaborators, newCollaborator }
