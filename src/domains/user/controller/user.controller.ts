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
 *     UserDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The 32-characters-id of the follow.
 *         name:
 *           type: string | null
 *           description: The user's name.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Datetime when the user was created in db.
 *         isPrivate:
 *           type: boolean
 *           description: Privacy of the user account.
 *       example:
 *         id: abcdefg-hijklmn-opqrstu-vwxyz-1
 *         name: JohnDoe
 *         createdAt: 2023-10-12T15:18:32.546Z
 *         isPrivate: true
 * 
 *     ExtendedUserDTO:
 *       allOf:
 *         - $ref: '#/components/schemas/UserDTO'
 *         - type: object
 *           required:
 *             - email
 *             - user
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               description: The user's email address.
 *             user:
 *               type: string
 *               description: The user's username.
 *             password:
 *               type: string
 *               description: The user's password.
 *
 *           example:
 *             email: example@user.com
 *             user: username
 *             password: Password123.
 *     
 *     ProfilePictureDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The file's name.
 *         extension:
 *           type: string
 *           description: The file's extension.
 *       example:
 *         name: myFile
 *         extension: .txt
 * 
 *      UserViewDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The 32-characters-id of the follow.
 *         name:
 *           type: string
 *           description: The user's name.
 *         username:
 *           type: string
 *           description: The user's username.
 *         profilePicture:
 *           type: string | null
 *           description: The user's profile picture.
 *
 *       example:
 *         id: abcdefg-hijklmn-opqrstu-vwxyz-1
 *         name: JohnDoe
 *         username: John_Doe
 *         profilePicture: example.png
 */
/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoints for getting user information.
 * /api/user:
 *   get:
 *     summary: Returns recomended users paginated.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns an array with all the users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDTO'
 *       401:
 *         description: You must be logged to see the information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UnauthorizedException'
 *       404:
 *         description: Not found that user ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/NotFoundException'
 *       500:
 *         description: Some server error.
 *         example: Server error.
 *   delete:
 *     summary: Deletes the logged user.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user has been deleted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDTO'
 *       401:
 *         description: You must be logged to see the information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UnauthorizedException'
 *       500:
 *         description: Some server error.
 *         example: Server error.
 * api/user/me:
 *   get:
 *     summary: Returns information about the logged user.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the logged user's info.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDTO'
 *       401:
 *         description: You must be logged to see the information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UnauthorizedException'
 *       404:
 *         description: Not found that user ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/NotFoundException'
 *       500:
 *         description: Some server error.
 *         example: Server error.
 * /api/user/{userId}:
 *   get:
 *     summary: Returns information about an user by id.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *         example: ce506c7a-9658-4093-920d-6bd5c5091897
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the user's info.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDTO'
 *       401:
 *         description: You must be logged to see the information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UnauthorizedException'
 *       404:
 *         description: Not found that user ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/NotFoundException'
 *       500:
 *         description: Some server error.
 *         example: Server error.
 * /api/user/by_username/{username}:
 *   get:
 *     summary: Returns a list with the information of users that their usernames are included in {username}.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *         example: ce506c7a-9658-4093-920d-6bd5c5091897
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list with the users' info.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDTO'
 *       401:
 *         description: You must be logged to see the information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UnauthorizedException'
 *       404:
 *         description: Not found that user ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/NotFoundException'
 *       500:
 *         description: Some server error.
 *         example: Server error.
 * /api/user/update/privacy:
 *   post:
 *     summary: Updates the privacy of the logged user.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the user's info with the changed privacy.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDTO'
 *       400:
 *         description: Invalid request body.
 *       401:
 *         description: You must be logged to see the information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UnauthorizedException'
 *       404:
 *         description: Not found that user ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/NotFoundException'
 *       500:
 *         description: Some server error.
 *         example: Server error.
 * /api/user/update/profile_picture:
 *   post:
 *     summary: Updates the profile picture of the logged user.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfilePictureDTO'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list with the users' info.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDTO'
 *       400:
 *         description: Invalid request body.
 *       401:
 *         description: You must be logged to see the information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UnauthorizedException'
 *       404:
 *         description: Not found that user ID.
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

import { BodyValidation, db } from '../../../utils'

import { UserRepositoryImpl } from '../repository'
import { UserService, UserServiceImpl } from '../service'
import { ProfilePictureDTO } from '../dto'

export const userRouter = Router()

// Use dependency injection
const service: UserService = new UserServiceImpl(new UserRepositoryImpl(db))

userRouter.get('/', async (req: Request, res: Response) => {
  const { userId } = res.locals.context
  const { limit, skip } = req.query as Record<string, string>

  const users = await service.getUserRecommendations(userId, { limit: Number(limit), skip: Number(skip) })

  return res.status(HttpStatus.OK).json(users)
})

userRouter.get('/by_username/:username', async (req: Request, res: Response) => {
  const { userId } = res.locals.context
  const { username } = req.params
  const { limit, before, after } = req.query as Record<string, string>

  const users = await service.getUsersByUsername(userId, username, { limit: Number(limit), before, after })
  return res.status(HttpStatus.OK).json(users)
})

userRouter.post('/update/privacy', async (req: Request, res: Response) => {
  const { userId } = res.locals.context
  const isPrivate: boolean = req.body.isPrivate

  const users = await service.setUserPrivacy(userId, isPrivate)

  return res.status(HttpStatus.OK).json(users)
})


userRouter.post('/update/profile_picture', BodyValidation(ProfilePictureDTO), async (req: Request, res: Response) => {
  const { userId } = res.locals.context
  const profilePictureData: ProfilePictureDTO = req.body
  const users = await service.setUserProfilePicture(userId, profilePictureData)

  return res.status(HttpStatus.OK).json(users)
})

userRouter.get('/me', async (req: Request, res: Response) => {
  const { userId } = res.locals.context

  const user = await service.getUser(userId)

  return res.status(HttpStatus.OK).json(user)
})

userRouter.get('/:userId', async (req: Request, res: Response) => {
  const { userId: otherUserId } = req.params

  const user = await service.getUser(otherUserId)

  return res.status(HttpStatus.OK).json(user)
})

userRouter.delete('/', async (req: Request, res: Response) => {
  const { userId } = res.locals.context

  await service.deleteUser(userId)

  return res.status(HttpStatus.OK).send(`Deleted post ${userId}`)
})
