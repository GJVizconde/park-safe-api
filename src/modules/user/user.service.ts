import { prisma } from '../prisma'
import { handleError } from '../../utils/errorResponse'

const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      include: {
        vehicles: {}
      }
    })
    return users
  } catch (error) {
    handleError(error, 'ERROR_GET_USERS')
  }
}

export { getAllUsers }
