import { prisma } from '../prisma'
import { handleError } from '../../utils/errorResponse'
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

    console.log('Nuevo Registro')

    console.log('licensePlate => ', body.licensePlate)

    if (await getVehicleByLicense(body?.licensePlate)) throw new Error('CAR_ALREADY_REGISTER')

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

const getVehicleByUser = async (userId: number) => {
  try {
    const vehicle = await prisma.vehicle.findMany({
      where: {
        users: {
          every: {
            id: Number(userId)
          }
        }
      },
      include: {
        Ticket: {}
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
