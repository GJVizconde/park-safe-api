export interface Ticket {
  checkIn?: Date
  checkOut?: Date | null
  parkingStayMin?: number | null
  amountPaid?: number | null
  checkInFormatted?: string
  checkOutFormatted?: string
  parkingId: string
  userId: number
  collaboratorId?: number
  vehicleId: string
  isDelete: boolean
}
