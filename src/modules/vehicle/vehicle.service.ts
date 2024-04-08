import { prisma } from '../prisma'
import { handleError } from '../../utils/errorResponse'
import { Vehicle } from './vehicle.interface'

const getAllVehicles = async (id?: string) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        ...(id && {
          id
        })
      }
    })
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

    if (!user) throw new Error('USER NOT FOUND, REGISTER NEW USER')

    if (await getVehicleByUser(body?.user_id, body?.licensePlate))
      throw new Error('CAR_ALREADY_REGISTER_BY_THIS_USER')

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
        users: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })
    return newVehicle
  } catch (error) {
    handleError(error, 'ERROR_REGISTER_VEHICLE')
  }
}

const getVehicleByUser = async (userId: number, licensePlate?: string) => {
  try {
    const vehicle = await prisma.vehicle.findMany({
      where: {
        ...(licensePlate && {
          licensePlate: licensePlate
        }),
        users: {
          every: {
            id: Number(userId)
          }
        }
      }
    })
    return vehicle[0]
  } catch (error) {
    handleError(error, 'ERROR_GET_VEHICLE_BY_USER_ID')
  }
}

const getVehicleByLicense = async (licenseId: string) => {
  try {
    const vehicle = await prisma.vehicle.findMany({
      where: {
        licensePlate: licenseId
      }
    })
    return vehicle[0]
  } catch (error) {
    handleError(error, 'ERROR_GET_VEHICLE_BY_license')
  }
}

export { getAllVehicles, registerNewVehicle, getVehicleByUser, getVehicleByLicense }
