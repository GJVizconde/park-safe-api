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
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role,
        id: Number(body.id)
      }
    })

    return newUser
  } catch (error) {
    handleError(error, 'ERROR_REGISTER_NEW_USER')
  }
}

const loginUser = async ({ id, password }: Auth) => {
  const checkIs = await prisma.user.findFirst({
    where: {
      id: Number(id)
    },
    include: {
      tickets: {
        where: {
          isDelete: false
        },
        select: { id: true }
      }
    }
  })

  const checkIsCollaborator = await prisma.collaborator.findUnique({
    where: {
      id: Number(id)
    }
  })
  if (!checkIs && !checkIsCollaborator) throw new Error('NOT_FOUND_USER')

  if (checkIs) {
    const passwordHash = checkIs.password

    if (password !== passwordHash) throw new Error('Credentials are invalid')

    const token = generateToken(checkIs.email, checkIs.role, checkIs.id)
    const data = {
      token,
      user: {
        id: checkIs.id,
        name: checkIs.name,
        email: checkIs.email,
        role: checkIs.role,
        hasTicket: checkIs?.tickets[0]?.id ? true : false
      }
    }

    return data
  } else if (checkIsCollaborator) {
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
