import { prisma } from '../prisma'
import { handleError } from '../../utils/errorResponse'
import { Ticket } from './ticket.interface'

const getAllTickets = async () => {
  try {
    const tickets = await prisma.ticket.findMany({
      include: {
        user: {},
        vehicle: {}
      }
    })
    return tickets
  } catch (error) {
    handleError(error, 'ERROR_GET_TICKETS')
  }
}

const generateNewTicket = async (body: Ticket) => {
  try {
    const user = await prisma.ticket.findUnique({
      where: {
        userId: body.userId
      }
    })

    if (user) throw new Error('User already registered a vehicle')

    const vehicle = await prisma.ticket.findUnique({
      where: {
        vehicleId: body.vehicleId
      }
    })

    if (vehicle) throw new Error('Vehicle is already registered')

    const newTicket = await prisma.ticket.create({
      data: {
        userId: body.userId,
        vehicleId: body.vehicleId,
        parkingPlace: body.parkingPlace,
        collaborators: {
          connect: {
            id: Number(body.collaboratorId) // ID del usuario que deseas conectar al vehículo
          }
        }
      }
    })
    return newTicket
  } catch (error) {
    handleError(error, 'ERROR_REGISTER_VEHICLE')
  }
}

const getTicket = async (id: number) => {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        userId: id
      },
      include: {
        user: {},
        vehicle: {},
        collaborators: {}
      }
    })
    return ticket
  } catch (error) {
    handleError(error, 'ERROR_GET_TICKET_ID')
  }
}

const deleteTicketById = async (id: string) => {
  try {
    const ticket = await prisma.ticket.delete({
      where: {
        id
      }
    })
    return ticket
  } catch (error) {
    handleError(error, 'ERROR_DELETE_TICKET')
  }
}

export { getAllTickets, generateNewTicket, getTicket, deleteTicketById }
