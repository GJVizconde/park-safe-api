import { Request, Response } from 'express'
import { handleErrorResponse } from '../../utils/errorResponse'
import { deleteTicketById, generateNewTicket, getAllTickets, getTicket } from './ticket.service'

const getTickets = async (_req: Request, res: Response) => {
  try {
    const tickets = await getAllTickets()
    res.status(200).send(tickets)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

const generateTicket = async ({ body }: Request, res: Response) => {
  try {
    const ticket = await generateNewTicket(body)

    res.status(200).send(ticket)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

const getTicketByUserId = async (req: Request, res: Response) => {
  const { id } = req.query

  try {
    const ticket = await getTicket(Number(id))
    console.log('Saliendo', ticket)
    res.status(200).send(ticket)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

const deleteTicket = async ({ params }: Request, res: Response) => {
  const { id } = params

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

export { getTickets, generateTicket, getTicketByUserId, deleteTicket }
