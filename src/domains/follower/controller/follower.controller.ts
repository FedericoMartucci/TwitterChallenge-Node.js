import { Request, Response, Router } from 'express'
import HttpStatus from 'http-status'
// express-async-errors is a module that handles async errors in express, don't forget import it in your new controllers
import 'express-async-errors'

import { db, BodyValidation } from '@utils'
import { FollowerService, FollowerServiceImpl } from '../service'
import { FollowerRepositoryImpl } from '../repository'

// import { AuthService, AuthServiceImpl } from '../service'
// import { LoginInputDTO, SignupInputDTO } from '../dto'

export const followerRouter = Router()

// Use dependency injection
const service: FollowerService = new FollowerServiceImpl(new FollowerRepositoryImpl(db))

followerRouter.post('/follow/:userId', async (req: Request, res: Response) => {
    const userId: string  = req.params.userId

    const post = await service.follow(userId, req)
  
    return res.status(HttpStatus.OK).json(post)
})

followerRouter.post('/unfollow/:userId', async (req: Request, res: Response) => {
    const userId: string = req.params.userId
  
    const post = await service.unfollow(userId, req)
  
    return res.status(HttpStatus.OK).json(post)
})
