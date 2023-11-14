import { ForbiddenException, NotFoundException, db } from "../../../utils"
import { FollowerService } from "./follower.service"
import { Request } from "express"
import { FollowerRepository } from "../repository"
import { FollowDTO } from "../dto"
import { UserDTO, UserViewDTO } from "../../../domains/user/dto"
import { UserRepository, UserRepositoryImpl } from "../../../domains/user/repository"

export class FollowerServiceImpl implements FollowerService {
    constructor (private readonly repository: FollowerRepository, private readonly userRepository: UserRepository) {}
  
    async follow (userId: string, ownId: string): Promise<FollowDTO> {
        const followedId:boolean = await this.userRepository.isExistingId(userId)
        const isAlreadyFollowing: boolean = await this.repository.isFollowing(userId, ownId)

        if(!followedId) throw new NotFoundException('user')
        if(ownId === userId) throw new ForbiddenException()
        if(isAlreadyFollowing) throw new ForbiddenException()

        const followerUser:UserDTO|null = await this.userRepository.getById(ownId)
        const followedUser:UserDTO|null = await this.userRepository.getById(userId)

        return await this.repository.followByUsers(followerUser as UserDTO, followedUser as UserDTO)
    }
  
    async unfollow (userId: string, ownId: string): Promise<void> {
        const followedId:boolean = await this.userRepository.isExistingId(userId)
        
        if (!followedId) throw new NotFoundException('user')
        if(ownId === userId) throw new ForbiddenException()

        const followerUser:UserDTO|null = await this.userRepository.getById(ownId) 
        const followedUser:UserDTO|null = await this.userRepository.getById(userId)
        
        const followId:string|null = await this.repository.getFollowId(followerUser as UserDTO, followedUser as UserDTO)

        if(!followId) throw new ForbiddenException()

        await this.repository.unfollowById(followId)
    }
  }
  