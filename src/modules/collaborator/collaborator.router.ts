import { Router } from 'express'
import { getCollaborators, registerCollaborator } from './collaborator.controller'

const collaboratorRouter = Router()

collaboratorRouter.get('/', getCollaborators)
collaboratorRouter.post('/register', registerCollaborator)

export default collaboratorRouter
