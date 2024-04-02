import { sign, verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'token.01010101'

const generateToken = (email: string, role: string, id: number) => {
  const jwt = sign({ email, role, id }, JWT_SECRET, {
    expiresIn: '2h'
  })
  return jwt
}

const verifyToken = (jwt: string) => {
  const isUser = verify(jwt, JWT_SECRET)
  return isUser
}

export { generateToken, verifyToken }
