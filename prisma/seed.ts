import { PrismaClient } from '@prisma/client'
import { Parking } from './seedData'

const prisma = new PrismaClient()

async function main() {
  await prisma.parking.createMany({
    data: Parking
  })
}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect
  })
