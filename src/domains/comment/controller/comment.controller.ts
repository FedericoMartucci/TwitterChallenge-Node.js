import { Request, Response, Router } from 'express'
import HttpStatus from 'http-status'
// express-async-errors is a module that handles async errors in express, don't forget import it in your new controllers
import 'express-async-errors'

import { db, BodyValidation } from '@utils'

import { CommentRepositoryImpl } from '../repository'
import { CommentService, CommentServiceImpl } from '../service'
import { CommentInputDTO } from '../dto'

export const commentRouter = Router()

// Use dependency injection
const service: CommentService = new CommentServiceImpl(new CommentRepositoryImpl(db))

commentRouter.post('/:postId', BodyValidation(CommentInputDTO), async (req: Request, res: Response) => {
    const { userId } = res.locals.context
    const { postId } = req.params
    const comment = req.body
    
    const commentInfo = await service.comment(userId, postId, comment)
  
    return res.status(HttpStatus.OK).json(commentInfo)
})

// commentRouter.get('/:post_id', async (req: Request, res: Response) => {
//   const data = req.body

//   const token = await service.login(data)

//   return res.status(HttpStatus.OK).json(token)
// })
// commentRouter.delete('/:post_id', BodyValidation(SignupInputDTO), async (req: Request, res: Response) => {
//     const data = req.body
  
//     const token = await service.signup(data)
  
//     return res.status(HttpStatus.CREATED).json(token)
//   })