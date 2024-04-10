import { prisma } from '../prisma'
import { handleError } from '../../utils/errorResponse'
import { Ticket } from './ticket.interface'
import { getAllVehicles } from '../vehicle/vehicle.service'
import { localTime } from '../../utils/DateTime'
import moment from 'moment'

moment.locale('es')

const getAllTickets = async (active?: boolean, userId?: number) => {
  try {
    let tickets = await prisma.ticket.findMany({
      where: {
        ...(active === true && {
          isDelete: false
        }),
        ...(userId && {
          user: {
            id: userId
          }
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

    tickets = tickets.map((ticket) => {
      return {
        ...ticket,
        checkInFormatted: moment(ticket.checkIn).format('LLLL')
      }
    })

    return tickets
  } catch (error) {
    handleError(error, 'ERROR_GET_TICKETS')
  }
}

const generateNewTicket = async (body: Ticket, timeZoneOffset?: string) => {
  const localDateTime = localTime(timeZoneOffset)

  try {
    const user = await prisma.ticket.findFirst({
      where: {
        userId: body.userId,
        isDelete: false
      }
    })

    if (user) throw new Error('User already has a ticket')

    const vehicle = await getAllVehicles(body.vehicleId)

    const isExistVehicle = await prisma.ticket.findFirst({
      where: {
        vehicle: {
          licensePlate: vehicle ? vehicle[0]?.licensePlate : ''
        },
        isDelete: false
      }
    })

    if (isExistVehicle) throw new Error('Vehicle is already assign to a ticket')

    const newTicket = await prisma.ticket.create({
      data: {
        userId: body.userId,
        vehicleId: body.vehicleId,
        parkingId: body.parkingId,
        checkIn: localDateTime,
        collaborators: {
          connect: {
            id: Number(body.collaboratorId) // ID del usuario que deseas conectar al vehículo
          }
        }
      }
    })

    const statusParking = await prisma.parking.update({
      where: {
        id: body.parkingId
      },
      data: {
        available: false
      }
    })

    return {
      newTicket,
      statusParking
    }
  } catch (error) {
    handleError(error, 'ERROR_REGISTER_TICKET')
  }
}

const getTicket = async (id: number) => {
  try {
    const ticket = await prisma.ticket.findFirst({
      where: {
        userId: id,
        isDelete: false
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

const softDeleteTicketStatus = async (id: string, timeZoneOffset?: string) => {
  try {
    const localDateTime = localTime(timeZoneOffset)

    let ticket: Ticket = await prisma.ticket.update({
      where: {
        id: id
      },
      data: {
        isDelete: true,
        checkOut: localDateTime,
        parking: {
          update: {
            available: true
          }
        }
      }
    })

    ticket = {
      ...ticket,
      checkOutFormatted: moment(ticket.checkOut).format('LLLL')
    }

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
