/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:            
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     ForbiddenException:
 *       description: Forbidden. You are not allowed to perform this action.
 *     NotFoundException:
 *       description: Not found. Couldn't find any user.
 *   schemas:
 *     FollowDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The 32-characters-id of the follow.
 *         followerId:
 *           type: string | undefined    
 *           description: The id of the user who follows.
 *         followedId:
 *           type: string | undefined 
 *           description: The id of the user who is followed.
 *         createdAt:
 * 
 * 
 *           type: string
 *           description: Datetime when the follow is saved in db.
 *       example:
 *         id: abcdefg-hijklmn-opqrstu-vwxyz-1
 *         followerId: abcdefg-hijklmn-opqrstu-vwxyz-2
 *         followedId: abcdefg-hijklmn-opqrstu-vwxyz-3
 *         createdAt: 2023-10-12T15:18:32.546Z
 */
/**
 * @swagger
 * tags:
 *   name: Follow
 *   description: The auth managing API
 * /api/follower/follow/{userId}:
 *   post:
 *     summary: A logged user start following another user
 *     tags: [Follow]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *         example: abcdefg-hijklmn-opqrstu-vwxyz-3
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged user has started following another user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FollowDTO'
 *       403:
 *         description: Logged user already follow him or he cannot follow himself.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ForbiddenException'
 *       404:
 *         description: UserID not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/NotFoundException'
 *       500:
 *         description: Some server error.
  * /api/follower/unfollow/{userId}:
 *   post:
 *     summary: A logged user unfollow another user
 *     tags: [Follow]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *         example: abcdefg-hijklmn-opqrstu-vwxyz-3
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged user unfollowed another user.
 *       403:
 *         description: Logged user does not follow him or he cannot unfollow himself.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ForbiddenException'
 *       404:
 *         description: UserID not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/NotFoundException'
 *       500:
 *         description: Some server error.
 */
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
