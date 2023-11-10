import { FollowerRepository } from "../../src/domains/follower/repository"
import { FollowDTO } from "../../src/domains/follower/dto";
import { UserDTO } from "../../src/domains/user/dto";

export class FollowerRepositoryTestImpl implements FollowerRepository{
    async followByUsers (follower: UserDTO, followed: UserDTO): Promise<FollowDTO> {
        return new FollowDTO("followId", follower.id, followed.id, new Date())
    }

    async unfollowById (followId: string): Promise<void> {}

    async getFollowId (follower: UserDTO, followed: UserDTO): Promise<string | undefined> {
        return follower.id === "already-following-userId"? "followId" : undefined
    }
    
    async isFollowing (userId: string, ownId: string): Promise<boolean> {
        return userId === 'already-following-userId'? true : false
    }
}