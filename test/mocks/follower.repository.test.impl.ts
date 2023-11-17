import { FollowerRepository } from "../../src/domains/follower/repository"
import { FollowDTO } from "../../src/domains/follower/dto";
import { UserDTO } from "../../src/domains/user/dto";

export class FollowerRepositoryTestImpl implements FollowerRepository{
    async followByUsers (follower: UserDTO, followed: UserDTO): Promise<FollowDTO> {
        return new FollowDTO("followId", follower.id, followed.id, new Date('2023-11-13T13:37:31.056Z'))
    }

    async unfollowById (followId: string): Promise<void> {}

    async getFollowId (follower: UserDTO, followed: UserDTO): Promise<string | null> {
        return followed.id === "already-following-userId"? "followId" : null
    }
    
    async isFollowing (userId: string, ownId: string): Promise<boolean> {
        return userId === 'already-following-userId' ? true : false
    }
}