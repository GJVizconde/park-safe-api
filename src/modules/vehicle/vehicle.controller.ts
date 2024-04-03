import { Request, Response } from 'express'
import { handleErrorResponse } from '../../utils/errorResponse'
import { getAllVehicles, getVehicle, registerNewVehicle } from './vehicle.service'

const getVechicles = async (_req: Request, res: Response) => {
  try {
    console.log('Estoy en getVechiclesController')
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
    const { id } = params
    console.log('Estoy en getVehicleByUserId')
    const vehicle = await getVehicle(Number(id))
    res.status(200).send(vehicle)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

export { getVechicles, registerVehicle, getVehicleByUserId }
