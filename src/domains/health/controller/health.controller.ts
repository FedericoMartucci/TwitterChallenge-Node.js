/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Checking server health
 * /api/health:
 *   get:
 *     summary: Checks if the server is alive
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: The server is on.
 *       500:
 *         description: Some server error.
 *
 */
import { Request, Response, Router } from 'express'
import HttpStatus from 'http-status'
// express-async-errors is a module that handles async errors in express, don't forget import it in your new controllers
import 'express-async-errors'

export const healthRouter = Router()

healthRouter.get('/', (req: Request, res: Response) => {
  return res.status(HttpStatus.OK).send()
})
