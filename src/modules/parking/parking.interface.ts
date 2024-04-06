import { Auth } from '../auth/auth.interface'

export interface User extends Auth {
  name: string
  email: string
  role: 'USER' | 'EMPLOYEE' | 'ADMIN' // Definición de los roles válidos
}
