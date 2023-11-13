import { CreatePostInputDTO, PostDTO } from "../../src/domains/post/dto";
import { FollowerService, FollowerServiceImpl } from "../../src/domains/follower/service"
import { ForbiddenException, NotFoundException } from "../../src/utils";
import { FollowerRepositoryTestImpl } from "../mocks/follower.repository.test.impl";

const followerService: FollowerService = new FollowerServiceImpl(new FollowerRepositoryTestImpl())

describe('follow allows to follow users, handling constraints.', () => {
    test('', async () =>{

    })
})

describe('unfollow allows to unfollow users, handling constraints.', () => {
    test('', async () =>{
        
    })
})
// async follow (userId: string, ownId: string): Promise<FollowDTO> {
//     const followId:boolean = await userRepository.isExistingId(userId)
//     const isAlreadyFollowing: boolean = await this.repository.isFollowing(userId, ownId as string)

//     if(!followId) throw new NotFoundException('user')
//     if(ownId === userId) throw new ForbiddenException()
//     if(isAlreadyFollowing) throw new ForbiddenException()

//     const followerUser:UserDTO|null = await userRepository.getById(ownId)
//     const followedUser:UserDTO|null = await userRepository.getById(userId)

//     return await this.repository.followByUsers(followerUser as UserDTO, followedUser as UserDTO)
// }

// async unfollow (userId: string, ownId: string): Promise<void> {
//     const followedId:boolean = await new UserRepositoryImpl(db).isExistingId(userId)
    
//     if (!followedId) throw new NotFoundException('user')
//     if(ownId === userId) throw new ForbiddenException()

//     const followerUser:UserDTO|null = await new UserRepositoryImpl(db).getById(ownId) 
//     const followedUser:UserDTO|null = await new UserRepositoryImpl(db).getById(userId)
    
//     const followId:string|undefined = await this.repository.getFollowId(followerUser as UserDTO, followedUser as UserDTO)

//     if(followId === undefined) throw new ForbiddenException()

//     await this.repository.unfollowById(followId)
// }