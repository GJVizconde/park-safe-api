export interface Ticket {
  checkIn?: Date
  checkOut?: Date
  parkingPlace: string
  userId: number
  collaboratorId: number
  vehicleId: string
  isDelete: boolean
}
