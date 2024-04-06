import { Router } from 'express'
import { getParkingPlaces, registerNewPlace } from './parking.controller'

const ParkingRouter = Router()

ParkingRouter.get('/', getParkingPlaces)
ParkingRouter.post('/register', registerNewPlace)

export default ParkingRouter
