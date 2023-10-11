import { Request } from "express"
import { FollowDTO } from "../dto"

export interface FollowerService {
  follow: (userId: any, req: Request) => Promise<FollowDTO>
  unfollow: (userId: any, req: Request) => Promise<void>
}