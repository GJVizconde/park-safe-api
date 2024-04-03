import { prisma } from '../prisma'
import { handleError, handleErrorResponse } from '../../utils/errorResponse'
import { Vehicle } from './vehicle.interface'

const getAllVehicles = async () => {
  try {
    const vehicles = await prisma.vehicle.findMany({})
    return vehicles
  } catch (error) {
    handleError(error, 'ERROR_GET_VEHICLES')
  }
}

const registerNewVehicle = async (body: Vehicle) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: Number(body.user_id)
      }
    })

    console.log('USER => ', user)

    if (!user) throw new Error('USER NOT FOUND, REGISTER NEW USER')

    const newVehicle = await prisma.vehicle.create({
      data: {
        licensePlate: body.licensePlate, // Asegúrate de que este sea un ID único
        description: body.description, // Añade la descripción del vehículo aquí si es necesario
        users: {
          connect: {
            id: Number(body.user_id) // ID del usuario que deseas conectar al vehículo
          }
        }
      },
      include: {
        users: {}
      }
    })
    return newVehicle
  } catch (error) {
    handleError(error, 'ERROR_REGISTER_VEHICLE')
  }
}

const getVehicle = async (id: number) => {
  try {
    const vehicle = await prisma.vehicle.findMany({
      where: {
        users: {
          every: {
            id
          }
        }
      },
      include: {
        Ticket: {}
      }
    })
    return vehicle
  } catch (error) {
    handleError(error, 'ERROR_GET_VEHICLE_BY_USER_ID')
  }
}

export { getAllVehicles, registerNewVehicle, getVehicle }
