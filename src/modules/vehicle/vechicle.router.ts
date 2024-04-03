import { Router } from 'express'
import {
  getVehicles,
  getVehicleByLicensePlate,
  getVehicleByUserId,
  registerVehicle
} from './vehicle.controller'

const vehicleRouter = Router()

vehicleRouter.get('/', getVehicles)
vehicleRouter.post('/', registerVehicle)
vehicleRouter.get('/getByUser/:userId', getVehicleByUserId)
vehicleRouter.get('/getByVehicle/:licenseId', getVehicleByLicensePlate)

export default vehicleRouter
