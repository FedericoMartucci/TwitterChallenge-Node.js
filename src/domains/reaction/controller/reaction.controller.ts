/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:            
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     ConflictException:
 *       description: Already reacted with like or retweet.
 *       example: Already reacted with like or retweet.
 *     ForbiddenException:
 *       description: Forbidden. You are not allowed to perform this action.
 *       example: Forbidden. You are not allowed to perform this action.
 *     NotFoundException:
 *       description: Not found. Couldn't find any user.
 *       example: Not found. Couldn't find any user.
 *   schemas:
 *     ReactionInputDTO:
 *       type: object
 *       required:
 *         - reactionType
 *       properties:
 *         reactionType:
 *           type: string
 *           enum:
 *             - LIKE
 *             - RETWEET
 *           description: Type of reactions to a post.
 *     ReactionDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The reaction's ID.
 *         userId:
 *           type: string
 *           description: The user's ID who reacts.
 *         postId:
 *           type: string
 *           format: password
 *           description: The post's ID.
 *         reactionType:
 *           type: string
 *           enum:
 *             - LIKE
 *             - RETWEET
 *           description: Type of reactions to a post.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date time when user reacted to a post.
 *       example:
 *         id: abcdefg-hijklmn-opqrstu-vwxyz-1
 *         userId: abcdefg-hijklmn-opqrstu-vwxyz-2
 *         postId: abcdefg-hijklmn-opqrstu-vwxyz-3
 *         reactionType: LIKE
 *         createdAt: 2023-10-12T15:18:32.546Z
 */
/**
 * @swagger
 * tags:
 *   name: Reaction
 *   description: The reaction managing API.
 * /api/reaction/{postId}:
 *   post:
 *     summary: React to a post.
 *     tags: [Reaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReactionInputDTO'
 *     responses:
 *       200:
 *         description: React to a post and returns info about the reaction.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReactionDTO'
 *       400:
 *         description: Invalid request body.
 *         example: Validation error.
 *       404:
 *         description: Cannot found the post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/NotFoundException'
 *       409:
 *         description: The user has already reacted to that post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ConflictException'
 *       500:
 *         description: Some server error.
 *         example: Server error.
 *   delete:
 *     summary: Delete a reaction.
 *     tags: [Reaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReactionInputDTO'
 *     responses:
 *       200:
 *         description: Reaction deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReactionDTO'
 *       400:
 *         description: Invalid request body.
 *         example: Validation error.
 *       404:
 *         description: Cannot found the reaction.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/NotFoundException'
 *       500:
 *         description: Some server error.
 *         example: Server error.
 *
 */
import { Request, Response, Router } from 'express'
import HttpStatus from 'http-status'
// express-async-errors is a module that handles async errors in express, don't forget import it in your new controllers
import 'express-async-errors'

import { db, BodyValidation } from '@utils'


import { ReactionRepositoryImpl } from '../repository'
import { ReactionService, ReactionServiceImpl } from '../service'
import { ReactionInputDTO } from '../dto'

export const reactionRouter = Router()

// Use dependency injection
 const service: ReactionService = new ReactionServiceImpl(new ReactionRepositoryImpl(db))

reactionRouter.post('/:postId', BodyValidation(ReactionInputDTO), async (req: Request, res: Response) => {
  const { userId } = res.locals.context
  const { postId } = req.params
  const reactionType = req.body

  const reaction = await service.react(userId, postId, reactionType)

  return res.status(HttpStatus.OK).json(reaction)
})


reactionRouter.delete('/:postId', BodyValidation(ReactionInputDTO), async (req: Request, res: Response) => {
  const { userId } = res.locals.context
  const { postId } = req.params
  const reactionType = req.body

  const reactionId = await service.deleteReaction(userId, postId, reactionType)

  return res.status(HttpStatus.OK).send(`Deleted reaction ${reactionId}`)
})