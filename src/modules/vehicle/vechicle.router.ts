import { Router } from 'express'
import { getVechicles, registerVehicle } from './vehicle.controller'

const vehicleRouter = Router()

vehicleRouter.get('/', getVechicles)
vehicleRouter.post('/', registerVehicle)

export default vehicleRouter
