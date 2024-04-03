import { Router } from 'express'
import { getVechicles, getVehicleByUserId, registerVehicle } from './vehicle.controller'

const vehicleRouter = Router()

vehicleRouter.get('/:id', getVehicleByUserId)
vehicleRouter.get('/', getVechicles)
vehicleRouter.post('/', registerVehicle)

export default vehicleRouter
