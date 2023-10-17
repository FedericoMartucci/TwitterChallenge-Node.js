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
 *       description: Not found. Couldn't find any user.
 *       example: Not found. Couldn't find any user.
 *     UnauthorizedException:
 *       description: Unauthorized. You are not allowed to perform this action.
 *       example: Unauthorized. You are not allowed to perform this action.
 *   schemas:
 *     CreatePostInputDTO:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         content:
 *           type: string
 *           description: Post's content/description.
 *         images:
 *           type: array
 *           items:
 *             type: string  
 *           description: List of post's images.
 *       example:
 *         content: example content.
 *         images: [example1.png, example2.png]
 *     PostDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Post's ID.
 *         authorId:
 *           type: string
 *           description: Author's ID.
 *         content:
 *           type: string
 *           description: Post's content.
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: List of post's images.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Post's date.
 *       example:
 *         id: abcdefg-hijklmn-opqrstu-vwxyz-1
 *         authorId: abcdefg-hijklmn-opqrstu-vwxyz-2
 *         content: example content.
 *         images: [example1.png, example2.png]
 *         createdAt: 2023-10-12T15:18:32.546Z
 * 
 */
/**
 * @swagger
 * tags:
 *   name: Post
 *   description: Endpoints referred to posts.
 * /api/post:
 *   get:
 *     summary: Returns post feed paginated.
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns an array of posts of user with public accounts or that I follow.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostDTO'
 *       401:
 *         description: You must be logged to see the information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UnauthorizedException'
 *       404:
 *         description: Posts not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/NotFoundException'
 *       500:
 *         description: Some server error.
 *         example: Server error.
 *   post:
 *     summary: Creates a post.
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePostInputDTO'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Creates a post and returns it.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostDTO'
 *       400:
 *         description: Invalid request body.
 *       401:
 *         description: You must be logged to execute that action.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UnauthorizedException'
 *       500:
 *         description: Some server error.
 *         example: Server error.
 * /api/post/{post_id}:
 *   get:
 *     summary: Returns a post by id.
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID.
 *         example: abcdefg-hijklmn-opqrstu-vwxyz-3
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the post requested.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostDTO'
 *       401:
 *         description: You must be logged to see the information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UnauthorizedException'
 *       403:
 *         description: You have to follow the owner of the post to see it.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ForbiddenException'
 *       404:
 *         description: Post not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/NotFoundException'
 *       500:
 *         description: Some server error.
 *         example: Server error.
 *   delete:
 *     summary: Deletes a post by id.
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID.
 *         example: abcdefg-hijklmn-opqrstu-vwxyz-3
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Post deleted successfully.
 *       401:
 *         description: You must be logged to execute that action.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UnauthorizedException'
 *       403:
 *         description: You can only delete your posts.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ForbiddenException'
 *       404:
 *         description: PostID not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/NotFoundException'
 *       500:
 *         description: Some server error.
 *         example: Server error.
 *         
 * /api/post/by_user/{user_id}:
 *   get:
 *     summary: Returns all user posts by id.
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID.
 *         example: abcdefg-hijklmn-opqrstu-vwxyz-3
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns an array of the post that were posted by userId.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostDTO'
 *       401:
 *         description: You must be logged to see the information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UnauthorizedException'
 *       403:
 *         description: You have to follow that user to see his posts.
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
 *         example: Server error.
 */
import { Request, Response, Router } from 'express'
import HttpStatus from 'http-status'
// express-async-errors is a module that handles async errors in express, don't forget import it in your new controllers
import 'express-async-errors'

import { db, BodyValidation } from '@utils'

import { PostRepositoryImpl } from '../repository'
import { PostService, PostServiceImpl } from '../service'
import { CreatePostInputDTO } from '../dto'

export const postRouter = Router()

// Use dependency injection
const service: PostService = new PostServiceImpl(new PostRepositoryImpl(db))

postRouter.get('/', async (req: Request, res: Response) => {
  const { userId } = res.locals.context
  const { limit, before, after } = req.query as Record<string, string>

  const posts = await service.getLatestPosts(userId, { limit: Number(limit), before, after })

  return res.status(HttpStatus.OK).json(posts)
})

postRouter.get('/:postId', async (req: Request, res: Response) => {
  const { userId } = res.locals.context
  const { postId } = req.params

  const post = await service.getPost(userId, postId)

  return res.status(HttpStatus.OK).json(post)
})

postRouter.get('/by_user/:userId', async (req: Request, res: Response) => {
  const { userId } = res.locals.context
  const { userId: authorId } = req.params

  const posts = await service.getPostsByAuthor(userId, authorId)

  return res.status(HttpStatus.OK).json(posts)
})

postRouter.post('/', BodyValidation(CreatePostInputDTO), async (req: Request, res: Response) => {
  const { userId } = res.locals.context
  const data = req.body

  const post = await service.createPost(userId, data)

  return res.status(HttpStatus.CREATED).json(post)
})

postRouter.delete('/:postId', async (req: Request, res: Response) => {
  const { userId } = res.locals.context
  const { postId } = req.params

  await service.deletePost(userId, postId)

  return res.status(HttpStatus.OK).send(`Deleted post ${postId}`)
})
