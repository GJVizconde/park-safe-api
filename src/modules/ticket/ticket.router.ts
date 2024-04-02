import { Router } from 'express'
import { deleteTicket, generateTicket, getTicketByUserId, getTickets } from './ticket.controller'

const ticketRouter = Router()

ticketRouter.get('/', getTickets)
ticketRouter.post('/', generateTicket)
ticketRouter.delete('/:id', deleteTicket)
ticketRouter.get('/userTicket', getTicketByUserId)

export default ticketRouter
