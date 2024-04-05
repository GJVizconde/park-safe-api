import { Router } from 'express'
import {
  deleteTicket,
  generateTicket,
  getTicketByUserId,
  getTickets,
  softDeleteTicket
} from './ticket.controller'

const ticketRouter = Router()

ticketRouter.get('/', getTickets)
ticketRouter.post('/', generateTicket)
ticketRouter.get('/userTicket', getTicketByUserId)
ticketRouter.delete('/:id', deleteTicket)
ticketRouter.patch('/:id', softDeleteTicket)

export default ticketRouter
