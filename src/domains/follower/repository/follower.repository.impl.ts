import { PrismaClient } from "@prisma/client";
import { FollowerRepository } from "./follower.repository";
import { FollowDTO } from "../dto";
import { UserDTO, UserViewDTO } from "@domains/user/dto";
export class FollowerRepositoryImpl implements FollowerRepository {
  constructor (private readonly db: PrismaClient) {}
  
  async getFollowId (follower:UserDTO, followed:UserDTO): Promise<string|undefined>{
    const followId = await this.db.follow.findFirst({
      where:{
        follower: follower,
        followed: followed,
      }
    })
    return followId?.id;
  }
  async followByUsers (follower:UserDTO, followed:UserDTO): Promise<FollowDTO>{
    const follow = await this.db.follow.create({
      data: {
        follower: {
          connect: { id: follower?.id },
        },
        followed: {
          connect: { id: followed?.id },
        },
      }
    })
    return new FollowDTO(follow.id, follow.followerId, follow.followedId, follow.createdAt)
  }

  async unfollowById (followId: string|undefined): Promise<void>{     
    const unfollow = await this.db.follow.delete({
      where: {
        id: followId,
      },
    })
  }
  async isFollowing (followedId: string, followerId: string): Promise<boolean>{
    const isAlreadyFollowing = await this.db.follow.findFirst({
      where:{
        followedId: followedId,
        followerId: followerId,
      },
    })
    return isAlreadyFollowing ? true : false
  }
}