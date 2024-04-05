import { prisma } from '../prisma'
import { handleError } from '../../utils/errorResponse'
import { Ticket } from './ticket.interface'

const getAllTickets = async (active: boolean | undefined) => {
  try {
    console.log('ACTIVE => ', active)
    const tickets = await prisma.ticket.findMany({
      where: {
        ...(active === true && {
          isDelete: false
        })
      },
      include: {
        user: {
          select: {
            id: true,
            name: true
          }
        },
        collaborators: {
          select: {
            name: true
          }
        },
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
    const user = await prisma.ticket.findFirst({
      where: {
        userId: body.userId,
        isDelete: false
      }
    })

    if (user) throw new Error('User already registered a vehicle')

    const vehicle = await prisma.ticket.findFirst({
      where: {
        vehicleId: body.vehicleId,
        isDelete: false
      }
    })

    console.log('vehicle', vehicle)

    // if (vehicle) throw new Error('Vehicle is already registered')

    //TODO: Check user already has a ticket
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
    const ticket = await prisma.ticket.findFirst({
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

const softDeleteTicketStatus = async (id: string) => {
  try {
    const ticket = await prisma.ticket.update({
      where: {
        id: id
      },
      data: {
        isDelete: true
      }
    })

    return ticket
  } catch (error) {
    handleError(error, 'ERROR_LOGIC_DELETE_TICKET')
  }
}

const deleteTicketById = async (id: string) => {
  try {
    //TODO:Verificar si existe el ticket, manejar ese error
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

export { getAllTickets, generateNewTicket, getTicket, softDeleteTicketStatus, deleteTicketById }
