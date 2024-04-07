import { prisma } from '../prisma'
import { handleError } from '../../utils/errorResponse'

const getAllUsers = async (userId: number | null, ticket: boolean | undefined) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        id: userId ? userId : undefined,

        ...(ticket === true && {
          tickets: {
            some: {
              isDelete: false
            }
          }
        }),
        role: 'USER'
      },
      include: {
        ...(ticket !== true && {
          // No incluir vehicles si ticket es verdadero
          vehicles: {}
        }),
        tickets: {
          where: {
            isDelete: false
          },
          include: {
            collaborators: {}
          }
        }
      }
    })
    return users
  } catch (error) {
    handleError(error, 'ERROR_GET_USERS')
  }
}

export { getAllUsers }
