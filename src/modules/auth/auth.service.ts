import { handleError } from '../../utils/errorResponse'
import { generateToken } from '../../utils/jwt.handle'
import { prisma } from '../prisma'
import { User } from '../user/user.interface'
import { Auth } from './auth.interface'

const newUser = async (body: User) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: Number(body.id)
      }
    })

    if (user) throw new Error('User already exist')

    const isEmailExist = await prisma.user.findFirst({
      where: {
        email: body.email
      }
    })

    if (isEmailExist) throw new Error('Email already registered')

    const newUser = await prisma.user.create({
      data: {
        ...body,
        id: Number(body.id)
      }
    })

    console.log(newUser)

    return newUser
  } catch (error) {
    handleError(error, 'ERROR_REGISTER_NEW_USER')
  }
}

const loginUser = async ({ email, password }: Auth, role: any) => {
  if (role === 'USER') {
    const checkIs = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!checkIs) throw new Error('NOT_FOUND_USER')
    const passwordHash = checkIs.password

    if (password !== passwordHash) throw new Error('Credentials are invalid')

    const token = generateToken(checkIs.email, checkIs.role, checkIs.id)
    const data = {
      token,
      user: checkIs
    }

    return data
  } else {
    const checkIsCollaborator = await prisma.collaborator.findUnique({
      where: {
        email
      }
    })
    if (!checkIsCollaborator) throw new Error('NOT_FOUND_USER')
    const passwordHash = checkIsCollaborator.password

    if (password !== passwordHash) throw new Error('Credentials are invalid')

    const token = generateToken(
      checkIsCollaborator.email,
      checkIsCollaborator.role,
      checkIsCollaborator.id
    )
    const data = {
      token,
      user: checkIsCollaborator
    }

    return data
  }
}

export { newUser, loginUser }
