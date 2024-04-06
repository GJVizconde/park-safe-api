export interface Ticket {
  checkIn?: Date
  checkOut?: Date
  parkingId: string
  userId: number
  collaboratorId: number
  vehicleId: string
  isDelete: boolean
}
