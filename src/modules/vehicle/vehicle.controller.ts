import { Request, Response } from 'express'
import { handleErrorResponse } from '../../utils/errorResponse'
import {
  getAllVehicles,
  getVehicleByLicense,
  getVehicleByUser,
  registerNewVehicle
} from './vehicle.service'

const getVehicles = async (_req: Request, res: Response) => {
  try {
    console.log('Estoy en getVehiclesController')
    const vehicles = await getAllVehicles()
    res.status(200).send(vehicles)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

const registerVehicle = async ({ body }: Request, res: Response) => {
  try {
    const vehicle = await registerNewVehicle(body)

    res.status(200).send(vehicle)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

const getVehicleByUserId = async ({ params }: Request, res: Response) => {
  try {
    const { userId } = params
    console.log('Estoy en getVehicleByUserId 2432423')
    const vehicle = await getVehicleByUser(Number(userId))
    res.status(200).send(vehicle)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

const getVehicleByLicensePlate = async ({ params }: Request, res: Response) => {
  try {
    console.log('Estoy en servicio000000000000000')
    const { licenseId } = params
    console.log('Estoy en getVehicleByLicensePlate')
    const vehicle = await getVehicleByLicense(licenseId)
    res.status(200).send(vehicle)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

export { getVehicles, registerVehicle, getVehicleByUserId, getVehicleByLicensePlate }
