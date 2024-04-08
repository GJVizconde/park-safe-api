import { prisma } from '../prisma'
import { handleError } from '../../utils/errorResponse'
import { User } from '../user/user.interface'

const getAllPlaces = async (available: boolean | undefined) => {
  try {
    const users = await prisma.parking.findMany({
      where: {
        ...(available && {
          available: available
        })
      }
    })
    return users
  } catch (error) {
    handleError(error, 'ERROR_GET_PARKING_PLACES')
  }
}

const registerParkingPlace = async (body: User) => {
  try {
    const isExist = await prisma.parking.findFirst({
      where: {
        id: body.id
      }
    })

    if (isExist) throw new Error('Parking Place already exist')

    const newParkingPlace = await prisma.parking.create({
      data: {
        id: body.id
      }
    })

    return newParkingPlace
  } catch (error) {
    handleError(error, 'ERROR_REGISTER_NEW_PARKING_PLACE')
  }
}

export { getAllPlaces, registerParkingPlace }
