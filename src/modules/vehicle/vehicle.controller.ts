import { Request, Response } from 'express'
import { handleErrorResponse } from '../../utils/errorResponse'
import {
  getAllVehicles,
  getVehicleByLicense,
  getVehicleByUser,
  registerNewVehicle
} from './vehicle.service'

const getVehicles = async ({ query: { id } }: Request, res: Response) => {
  try {
    const vehicles = await getAllVehicles(String(id))
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
    const vehicle = await getVehicleByUser(Number(userId))
    res.status(200).send(vehicle)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

const getVehicleByLicensePlate = async ({ params }: Request, res: Response) => {
  try {
    const { licenseId } = params
    const vehicle = await getVehicleByLicense(licenseId)
    res.status(200).send(vehicle)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

export { getVehicles, registerVehicle, getVehicleByUserId, getVehicleByLicensePlate }
