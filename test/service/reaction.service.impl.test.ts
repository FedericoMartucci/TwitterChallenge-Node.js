import { CreatePostInputDTO, PostDTO } from "../../src/domains/post/dto";
import { ReactionDTO, ReactionInputDTO, ReactionType } from "../../src/domains/reaction/dto";
import { ReactionService, ReactionServiceImpl } from "../../src/domains/reaction/service"
import { ConflictException, ForbiddenException, NotFoundException } from "../../src/utils";
import { PostRepositoryTestImpl } from "../mocks/post.repository.test.impl";
import { ReactionRepositoryTestImpl } from "../mocks/reaction.repository.test.impl";
import { UserRepositoryTestImpl } from "../mocks/user.repository.test.impl";

const reactionService: ReactionService = new ReactionServiceImpl(new ReactionRepositoryTestImpl(), new UserRepositoryTestImpl(), new PostRepositoryTestImpl())

describe('react is a method in which a user reacts to a post or comment.', () => {
    test('It should return a ReactionDTO', async () => {
        const userId: string = "userId";
        const postId: string = "not-reacted-post-id";
        const reactionType: ReactionInputDTO = new ReactionInputDTO(ReactionType.LIKE);

        const reaction: ReactionDTO = await reactionService.react(userId, postId, reactionType)

        expect(reaction).toBeInstanceOf(ReactionDTO);
    })
    test('It should throw NotFoundException(\'post\'', async () => {
        const userId: string = "userId";
        const postId: string = "non-existing-post-id";
        const reactionType: ReactionInputDTO = new ReactionInputDTO(ReactionType.LIKE);
        try{
            await reactionService.react(userId, postId, reactionType)
            fail('Expected NotFoundException but no exception was thrown');
        }catch(error){
            expect(error).toBeInstanceOf(NotFoundException);
        }
    })
    test('It should throw ConflictException', async () => {
        const userId: string = "userId";
        const postId: string = "already-reacted-postId";
        const reactionType: ReactionInputDTO = new ReactionInputDTO(ReactionType.LIKE);
        try{
            await reactionService.react(userId, postId, reactionType)
            fail('Expected ConflictException but no exception was thrown');
        }catch(error){
            expect(error).toBeInstanceOf(ConflictException);
        }
    })
})

describe('deleteReaction deletes a user\'s reaction to a post', () => {
    test('It should return the reaction id.', async() => {
        const userId: string = "userId";
        const postId: string = "already-reacted-post-id";
        const reactionType: ReactionInputDTO = new ReactionInputDTO(ReactionType.LIKE);

        const reactionId: string = await reactionService.deleteReaction(userId, postId, reactionType);

        expect(reactionId).toBe("reactionId");
    })
    test('It should throw NotFoundException as the user did not reacted already.', async() => {
        const userId: string = "userId";
        const postId: string = "not-reacted-post-id";
        const reactionType: ReactionInputDTO = new ReactionInputDTO(ReactionType.LIKE);

        try{
            await reactionService.deleteReaction(userId, postId, reactionType);
            fail('Expected NotFoundException but no exception was thrown');
        }catch(error){
            expect(error).toBeInstanceOf(NotFoundException);
        }
    })
})

describe('getReactionsByAuthorId returns all reactions that were done by a user', () => {
    test('It should return a list of reactions done by a user.', async() => {
        const userId: string = "userId";
        const authorId: string = "authorId";
        
        const reactions: ReactionDTO[] = await reactionService.getReactionsByAuthorId(userId, authorId);
        
        expect(reactions).toEqual(expect.arrayContaining<ReactionDTO>([
            {id: "reactionId1", userId: "authorId", postId: "postId1", reactionType: ReactionType.LIKE, createdAt: new Date('2023-11-13T13:37:31.056Z')},
            {id: "reactionId2", userId: "authorId", postId: "postId2", reactionType: ReactionType.RETWEET, createdAt: new Date('2023-11-13T13:37:31.056Z')},
            {id: "reactionId3", userId: "authorId", postId: "postId3", reactionType: ReactionType.LIKE, createdAt: new Date('2023-11-13T13:37:31.056Z')},
            {id: "reactionId4", userId: "authorId", postId: "postId4", reactionType: ReactionType.RETWEET, createdAt: new Date('2023-11-13T13:37:31.056Z')}
        ]));
    })
    test('It should throw NotFoundException as the user did not reacted to any post already.', async() => {
        const userId: string = "userId";
        const authorId: string = "anotherAuthorId";
        try{
            await reactionService.getReactionsByAuthorId(userId, authorId);
            fail('Expected NotFoundException but no exception was thrown');
        }catch(error){
            expect(error).toBeInstanceOf(NotFoundException);
        }
    })
})
