/**
 * @swagger
 * components:
 *   responses:
 *     ConflictException:
 *       description: The user already exists.
 *       example: The user already exists.
 *     ForbiddenException:
 *       description: Forbidden. You are not allowed to perform this action.
 *       example: Forbidden. You are not allowed to perform this action.
 *     NotFoundException:
 *       description: Not found. Couldn't find any user.
 *       example: Not found. Couldn't find any user.
 *   schemas:
 *     TokenDTO:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 *           description: Json Web Token with 24hr expiration.
 *       example:
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMjM5MzFhYS05YWEwLTRhNWYtYTMyMS05NGY5NjY5YzVkM2IiLCJpYXQiOjE2OTcxMjM4OTksImV4cCI6MTY5NzIxMDI5OX0.EXbjRcjaV7qifFbtImuCk7NZRDRcmRY-W11ynWWBWyY
 *     SignupInputDTO:
 *       type: object
 *       required:
 *         - email
 *         - username
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email address.
 *         username:
 *           type: string
 *           description: The user's username.
 *         password:
 *           type: string
 *           format: password
 *           description: The user's password.
 *         isPrivate:
 *           type: boolean
 *           description: Privacy of the user account.
 *       example:
 *         email: example@user.com
 *         username: username
 *         password: Password123.
 *         isPrivate: true
 *     LoginInputDTO:
 *       type: object
 *       required:
 *         - email
 *         - username
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email address of the user.
 *         username:
 *           type: string
 *           description: The username of the user.
 *         password:
 *           type: string
 *           format: password
 *           description: The password of the user.
 *       example:
 *         email: example@user.com
 *         username: username
 *         password: Password123.
 */
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The auth managing API.
 * /api/auth/signup:
 *   post:
 *     summary: Create a new user.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupInputDTO'
 *     responses:
 *       201:
 *         description: Creates a user and returns a token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenDTO'
 *       400:
 *         description: Invalid request body.
 *         example: Validation error.
 *       409:
 *         description: The user already exists.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ConflictException'
 *       500:
 *         description: Some server error.
 *         example: Server error.
 * /api/auth/login:
 *   post:
 *     summary: Login a user.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInputDTO'
 *     responses:
 *       200:
 *         description: Login the user and return the session token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenDTO'
 *       400:
 *         description: Invalid request body.
 *         example: Validation error.
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

import { db, BodyValidation } from '@utils'
import { UserRepositoryImpl } from '@domains/user/repository'

import { AuthService, AuthServiceImpl } from '../service'
import { LoginInputDTO, SignupInputDTO } from '../dto'

export const authRouter = Router()

// Use dependency injection
const service: AuthService = new AuthServiceImpl(new UserRepositoryImpl(db))

authRouter.post('/signup', BodyValidation(SignupInputDTO), async (req: Request, res: Response) => {
  const data = req.body

  const token = await service.signup(data)

  return res.status(HttpStatus.CREATED).json(token)
})

authRouter.post('/login', BodyValidation(LoginInputDTO), async (req: Request, res: Response) => {
  const data = req.body

  const token = await service.login(data)

  return res.status(HttpStatus.OK).json(token)
})
