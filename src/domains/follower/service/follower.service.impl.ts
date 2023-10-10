import { ForbiddenException, NotFoundException, getUserIdFromToken } from "@utils"
import { FollowerService } from "./follower.service"
import { Request } from "express"
import { FollowerRepository } from "../repository"

export class FollowerServiceImpl implements FollowerService {
    constructor (private readonly repository: FollowerRepository) {}
  
    async follow (userId: any, req: Request): Promise<void> {
        const followId = await this.repository.getById(userId)
        const ownId = getUserIdFromToken(req)
        if(ownId === userId) throw new ForbiddenException()

        return await this.repository.followById(userId)
    }
  
    async unfollow (userId: any, req: Request): Promise<void> {
        const followedId = await this.repository.getById(userId)
        const ownId = getUserIdFromToken(req)
        
        if (!followedId) throw new NotFoundException('user')
        if(ownId === userId) throw new ForbiddenException()
        
        await this.repository.unfollowById(userId)
    }
  }
  