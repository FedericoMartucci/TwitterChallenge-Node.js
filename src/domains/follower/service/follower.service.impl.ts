import { ForbiddenException, NotFoundException, db, getUserIdFromToken } from "@utils"
import { FollowerService } from "./follower.service"
import { Request } from "express"
import { FollowerRepository } from "../repository"
import { FollowDTO } from "../dto"
import { UserDTO, UserViewDTO } from "@domains/user/dto"
import { UserRepositoryImpl } from "@domains/user/repository"

export class FollowerServiceImpl implements FollowerService {
    constructor (private readonly repository: FollowerRepository) {}
  
    async follow (userId: any, req: Request): Promise<FollowDTO> {
        const followId:boolean = await new UserRepositoryImpl(db).isExistingId(userId)
        const ownId = getUserIdFromToken(req)
        const isAlreadyFollowing: boolean = await this.repository.isFollowing(userId, ownId as string)

        if(!followId) throw new NotFoundException('user')
        if(ownId === userId) throw new ForbiddenException()
        if(isAlreadyFollowing) throw new ForbiddenException()

        const followerUser:UserDTO|null = await new UserRepositoryImpl(db).getById(ownId) 
        const followedUser:UserDTO|null = await new UserRepositoryImpl(db).getById(userId)

        return await this.repository.followByUsers(followerUser as UserDTO, followedUser as UserDTO)
    }
  
    async unfollow (userId: any, req: Request): Promise<void> {
        const followedId:boolean = await new UserRepositoryImpl(db).isExistingId(userId)
        const ownId = getUserIdFromToken(req)
        
        if (!followedId) throw new NotFoundException('user')
        if(ownId === userId) throw new ForbiddenException()

        const followerUser:UserDTO|null = await new UserRepositoryImpl(db).getById(ownId) 
        const followedUser:UserDTO|null = await new UserRepositoryImpl(db).getById(userId)
        
        const followId:string|undefined = await this.repository.getFollowId(followerUser as UserDTO, followedUser as UserDTO)

        if(followId === undefined) throw new ForbiddenException()

        await this.repository.unfollowById(followId)
    }
  }
  