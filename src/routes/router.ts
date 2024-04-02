import { Request, Response, Router } from 'express'
import authRouter from '../modules/auth/auth.router'
import userRouter from '../modules/user/user.router'
import vehicleRouter from '../modules/vehicle/vechicle.router'
import collaboratorRouter from '../modules/collaborator/collaborator.router'
import ticketRouter from '../modules/ticket/ticket.router'

const router = Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/collaborator', collaboratorRouter)
router.use('/vehicle', vehicleRouter)
router.use('/ticket', ticketRouter)

export default router
