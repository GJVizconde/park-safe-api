import { Request, Response } from 'express'
import { handleErrorResponse } from '../../utils/errorResponse'
import {
  deleteTicketById,
  generateNewTicket,
  getAllTickets,
  getTicket,
  softDeleteTicketStatus
} from './ticket.service'

const getTickets = async ({ query: { active, userId } }: Request, res: Response) => {
  try {
    console.log('userId =>', userId)
    const tickets = await getAllTickets(Boolean(active), Number(userId))
    res.status(200).send(tickets)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

const generateTicket = async ({ body, headers }: Request, res: Response) => {
  try {
    const timeZoneOffset = headers['x-timezone-offset']
    const ticket = await generateNewTicket(body, String(timeZoneOffset))

    res.status(200).send(ticket)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

const getTicketByUserId = async (req: Request, res: Response) => {
  const { id } = req.query

  try {
    const ticket = await getTicket(Number(id))
    res.status(200).send(ticket)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

const softDeleteTicket = async ({ params: { id } }: Request, res: Response) => {
  try {
    const ticketStatus = await softDeleteTicketStatus(id)
    res.status(200).send(ticketStatus)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

const deleteTicket = async ({ params: { id } }: Request, res: Response) => {
  try {
    const ticket = await deleteTicketById(id)
    res.status(200).json({
      message: 'Ticket deleted',
      ticket
    })
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

export { getTickets, generateTicket, getTicketByUserId, softDeleteTicket, deleteTicket }
