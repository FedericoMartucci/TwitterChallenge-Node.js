import { FollowerService, FollowerServiceImpl } from "../../../src/domains/follower/service"
import { ForbiddenException, NotFoundException } from "../../../src/utils";
import { FollowerRepositoryTestImpl } from "../../mocks/follower.repository.test.impl";
import { UserRepositoryTestImpl } from "../../mocks/user.repository.test.impl";
import { FollowDTO } from "../../../src/domains/follower/dto";

const followerService: FollowerService = new FollowerServiceImpl(new FollowerRepositoryTestImpl(), new UserRepositoryTestImpl())

describe('follow allows to follow users, handling constraints.', () => {
    test('It should return a FollowDTO.', async () =>{
        const userId: string = 'userId'
        const ownId: string = 'ownId'

        const follow: FollowDTO = await followerService.follow(userId, ownId)

        expect(follow).toBeInstanceOf(FollowDTO)
        expect(follow).toEqual(new FollowDTO('followId', ownId, userId, new Date('2023-11-13T13:37:31.056Z')))
    })
    test('It should throw NotFoundException as the userId does not exist.', async () =>{
        const userId: string = 'nonexisting-user-id'
        const ownId: string = 'ownId'

        try {
            await followerService.follow(userId, ownId)
            fail('Expected NotFoundException but no exception was thrown');
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    })
    test('It should throw ForbiddenException as the ownId is the same as userId.', async () =>{
        const userId: string = 'ownId'
        const ownId: string = 'ownId'

        try {
            await followerService.follow(userId, ownId)
            fail('Expected ForbiddenException but no exception was thrown')
        } catch (error) {
            expect(error).toBeInstanceOf(ForbiddenException)
        }
    })
    test('It should throw ForbiddenException as the ownId is following the user with userId.', async () =>{
        const userId: string = 'already-following-userId'
        const ownId: string = 'ownId'

        try {
            await followerService.follow(userId, ownId)
            fail('Expected ForbiddenException but no exception was thrown');
        } catch (error) {
            expect(error).toBeInstanceOf(ForbiddenException);
        }
    })
})

describe('unfollow allows to unfollow users, handling constraints.', () => {
    test('It should call the function unfollowById once.', async () =>{
        const userId: string = 'already-following-userId'
        const ownId: string = 'ownId'

        const unfollowByIdSpy = jest.spyOn(FollowerRepositoryTestImpl.prototype, 'unfollowById')
        const unfollow: void = await followerService.unfollow(userId, ownId)
        
        expect(unfollowByIdSpy).toHaveBeenCalled()
        unfollowByIdSpy.mockRestore()
    })
    test('It should throw NotFoundException as the userId does not exist.', async () =>{
        const userId: string = 'nonexisting-user-id'
        const ownId: string = 'ownId'

        try {
            await followerService.unfollow(userId, ownId)
            fail('Expected NotFoundException but no exception was thrown');
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    })
    test('It should throw ForbiddenException as the ownId is the same as userId.', async () =>{
        const userId: string = 'ownId'
        const ownId: string = 'ownId'

        try {
            await followerService.unfollow(userId, ownId)
            fail('Expected ForbiddenException but no exception was thrown')
        } catch (error) {
            expect(error).toBeInstanceOf(ForbiddenException)
        }
    })
    test('It should throw ForbiddenException as the ownId is not following the user with userId.', async () =>{
        const userId: string = 'not-following-userId'
        const ownId: string = 'ownId'

        try {
            await followerService.unfollow(userId, ownId)
            fail('Expected ForbiddenException but no exception was thrown');
        } catch (error) {
            expect(error).toBeInstanceOf(ForbiddenException);
        }
    })
})
