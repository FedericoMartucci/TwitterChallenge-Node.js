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
 *       example: Forbidden. You are not allowed to perform this action.
 *     NotFoundException:
 *       description: Not found. Couldn't find any post.
 *       example: Not found. Couldn't find any post.
 *     UnauthorizedException:
 *       description: Unauthorized. You are not allowed to perform this action.
 *       example: Unauthorized. You are not allowed to perform this action.
 *   schemas:
 *     CommentInputDTO:
 *       type: object
 *       required:
 *         - comment
 *       properties:
 *         comment:
 *           type: string
 *           description: The comment that the user wants to post.
 *       example:
 *         comment: This is a comment.
 *     CommentDTO:
 *       type: object
 *       required:
 *         - authorId
 *         - postId
 *         - comment
 *         - createdAt
 *       properties:
 *         id:
 *           type: string
 *           description: Comment's id.
 *         authorId:
 *           type: string
 *           description: The comment's author.
 *         postId:
 *           type: string
 *           description: The comment's post.
 *         comment:
 *           type: string
 *           description: The comment's content.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The datetime when the comment was created at the db.
 *       example:
 *         id: uuid32
 *         authorId: uuid32-authorId
 *         postId: uuid32-postId
 *         comment: This is a comment.
 *         createdAt: 2023-10-12T15:18:32.546Z
 */
/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: These endpoints let you comment posts.
 * /api/comment/{postId}:
 *   get:
 *     summary: Gets all comments from a post.
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID.
 *         example: abcdefg-hijklmn-opqrstu-vwxyz-3
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list of the post's comments.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentDTO'
 *       401:
 *         description: You must be logged to see the information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UnauthorizedException'
 *       404:
 *         description: Post not found.
 *         content:
 *           application/json:
 *             responses:
 *               $ref: '#/components/responses/NotFoundException'
 *       500:
 *         description: Some server error.
 *         example: Server error.
 *   post:
 *     summary: Create a new comment.
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID.
 *         example: abcdefg-hijklmn-opqrstu-vwxyz-3
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentInputDTO'
 *     responses:
 *       200:
 *         description: Creates the comment and returns its info.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentDTO'
 *       400:
 *         description: Invalid request body.
 *         example: Validation error.
 *       401:
 *         description: You must be logged to see the information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UnauthorizedException'
 *       404:
 *         description: Post not found.
 *         content:
 *           application/json:
 *             responses:
 *               $ref: '#/components/responses/NotFoundException'
 *       500:
 *         description: Some server error.
 *         example: Server error.
 * /api/comment/by_user/{userId}:
 *   get:
 *     summary: Gets all the comment that a user has done to any post.
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The User ID.
 *         example: abcdefg-hijklmn-opqrstu-vwxyz-3
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list with all the comments to any post that a user has done.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentDTO'
 *       401:
 *         description: You must be logged to see the information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UnauthorizedException'
 *       404:
 *         description: Could not find any user.
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

import { db, BodyValidation } from '../../../utils'

import { CommentRepositoryImpl } from '../repository'
import { CommentService, CommentServiceImpl } from '../service'
import { CommentInputDTO } from '../dto'
import { UserRepositoryImpl } from '../../../domains/user/repository'
import { PostRepositoryImpl } from '../../../domains/post/repository'

export const commentRouter = Router()

// Use dependency injection
const service: CommentService = new CommentServiceImpl(new CommentRepositoryImpl(db), new UserRepositoryImpl(db), new PostRepositoryImpl(db))

commentRouter.post('/:postId', BodyValidation(CommentInputDTO), async (req: Request, res: Response) => {
    const { userId } = res.locals.context
    const { postId } = req.params
    const comment = req.body
    
    const commentInfo = await service.comment(userId, postId, comment)
  
    return res.status(HttpStatus.OK).json(commentInfo)
})

commentRouter.get('/:postId', async (req: Request, res: Response) => {
    const { userId } = res.locals.context
    const { postId } = req.params
    const { limit, before, after } = req.query as Record<string, string>

    const comments = await service.getCommentsByPostId(userId, postId, { limit: Number(limit), before, after })
    
    return res.status(HttpStatus.OK).json(comments)
})

commentRouter.get('/by_user/:userId', async (req: Request, res: Response) => {
    const { userId } = res.locals.context
    const { userId: authorId } = req.params
    
    const comments = await service.getCommentsByAuthorId(userId, authorId)
  
    return res.status(HttpStatus.OK).json(comments)
})