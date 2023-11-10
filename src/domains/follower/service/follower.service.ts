import { Request } from "express"
import { FollowDTO } from "../dto"

export interface FollowerService {
  follow: (userId: string, ownId: string) => Promise<FollowDTO>
  unfollow: (userId: string, ownId: string) => Promise<void>
}