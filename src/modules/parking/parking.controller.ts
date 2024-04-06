import { Request, Response } from 'express'
import { handleErrorResponse } from '../../utils/errorResponse'
import { getAllPlaces, registerParkingPlace } from './parking.service'

const getParkingPlaces = async ({ query: { available } }: Request, res: Response) => {
  try {
    const parkigPlaces = await getAllPlaces(Boolean(available))
    res.status(200).send(parkigPlaces)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

const registerNewPlace = async ({ body }: Request, res: Response) => {
  try {
    const newPlace = await registerParkingPlace(body)
    res.status(200).send(newPlace)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

export { getParkingPlaces, registerNewPlace }
