import { PrismaClient } from "@prisma/client";
import { FollowerRepository } from "./follower.repository";

export class FollowerRepositoryImpl implements FollowerRepository {
    constructor (private readonly db: PrismaClient) {}
    async getById (userId: any): Promise<UserDTO | null> {
        const user = await this.db.user.findUnique({
          where: {
            id: userId
          }
        })
        return user ? new UserDTO(user) : null
      }
    async followById (userId: any): Promise<void>{
        const follow = await this.db.follow.create({
              data: {
                
                followedId: userId,
                ...data
              }
            })
            return new PostDTO(post)
        }
    
    async unfollowById (userId: any): Promise<void>{
        const follow = await this.db.follow.create({
            data: {
              
              followedId: userId,
              ...data
            }
          })
          return new PostDTO(post)
      }
    }
}