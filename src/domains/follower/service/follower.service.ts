import { Request } from "express"

export interface FollowerService {
  follow: (userId: any, req: Request) => Promise<void>
  unfollow: (userId: any, req: Request) => Promise<void>
}
