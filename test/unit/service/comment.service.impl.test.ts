import { CreatePostInputDTO, ExtendedPostDTO, PostDTO } from "../../../src/domains/post/dto";
import { CommentService, CommentServiceImpl } from "../../../src/domains/comment/service"
import { NotFoundException } from "../../../src/utils";
import { CommentRepositoryTestImpl } from "../../mocks/comment.repository.test.impl";
import { PostRepositoryTestImpl } from "../../mocks/post.repository.test.impl";
import { UserRepositoryTestImpl } from "../../mocks/user.repository.test.impl";
import { CommentDTO, CommentInputDTO } from "../../../src/domains/comment/dto";
import { UserDTO } from "../../../src/domains/user/dto";

const commentService: CommentService = new CommentServiceImpl(new CommentRepositoryTestImpl(), new UserRepositoryTestImpl(), new PostRepositoryTestImpl())

describe('comment let users to make commentaries at post or another comments.', () => {
    test('It should return a CommentDTO.', async () => {
        const userId: string = 'userId'
        const postId: string = 'postId'
        const commentary: CommentInputDTO = new CommentInputDTO('commentary')
        
        const result: CommentDTO = await commentService.comment(userId, postId, commentary)

        expect(result).toEqual(new CommentDTO("commentId", userId, postId, commentary.comment, new Date('2023-11-13T13:37:31.056Z')))
    })
    test('It should throw NotFoundException as the post does not exist.', async () =>{
        const userId: string = 'userId'
        const postId: string = 'non-existing-post-id'
        const commentary: CommentInputDTO = new CommentInputDTO('commentary')

        try {
            await commentService.comment(userId, postId, commentary)
            fail('Expected NotFoundException but no exception was thrown');
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    })
    test('It should throw NotFoundException as the user does not exist.', async () =>{
        const userId: string = 'nonexisting-user-id'
        const postId: string = 'postId'
        const commentary: CommentInputDTO = new CommentInputDTO('commentary')

        try {
            await commentService.comment(userId, postId, commentary)
            fail('Expected NotFoundException but no exception was thrown');
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    })
})

describe('getCommentsByPostId let users to get all comments from a post.', () => {
    test('It should return a list of comments', async () => {
        const userId: string = 'privateAccount'
        const postId: string = 'postId'
        const { limit } = {limit: 5}

        const comments = await commentService.getCommentsByPostId(userId, postId, { limit: Number(limit) })

        expect(comments).toEqual(expect.arrayContaining<ExtendedPostDTO>([
            {id: "commentId1", authorId: "authorId1", content: "comment1", images: [], createdAt: new Date('2023-11-13T13:37:31.056Z'), author: new UserDTO({id: userId, name: 'name', createdAt: new Date('2023-11-13T13:37:31.056Z'), isPrivate: false, profilePicture: null}), qtyLikes: 1, qtyRetweets: 2, qtyComments: 3},
            {id: "commentId2", authorId: "authorId2", content: "comment2", images: [], createdAt: new Date('2023-11-13T13:37:31.056Z'), author: new UserDTO({id: userId, name: 'name', createdAt: new Date('2023-11-13T13:37:31.056Z'), isPrivate: false, profilePicture: null}), qtyLikes: 1, qtyRetweets: 2, qtyComments: 3},
            {id: "commentId3", authorId: "authorId3", content: "comment3", images: [], createdAt: new Date('2023-11-13T13:37:31.056Z'), author: new UserDTO({id: userId, name: 'name', createdAt: new Date('2023-11-13T13:37:31.056Z'), isPrivate: false, profilePicture: null}), qtyLikes: 1, qtyRetweets: 2, qtyComments: 3},
            {id: "commentId4", authorId: "authorId4", content: "comment4", images: [], createdAt: new Date('2023-11-13T13:37:31.056Z'), author: new UserDTO({id: userId, name: 'name', createdAt: new Date('2023-11-13T13:37:31.056Z'), isPrivate: false, profilePicture: null}), qtyLikes: 1, qtyRetweets: 2, qtyComments: 3},
        ]));
    })
    test('It should throw NotFoundException as the post does not have any comments.', async () =>{
        const userId: string = 'userId'
        const postId: string = 'non-existing-comments'
        const { limit } = {limit: 5}

        try {
            await commentService.getCommentsByPostId(userId, postId, { limit: Number(limit) })
            fail('Expected NotFoundException but no exception was thrown');
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    })
})

describe('getCommentsByAuthorId let users to get all comments that a user have done.', () => {
    test('It should return a list of comments', async () => {
        const userId: string = 'userId'
        const authorId: string = 'authorId'

        const comments = await commentService.getCommentsByAuthorId(userId, authorId)

        expect(comments).toEqual(expect.arrayContaining<CommentDTO>([
            {id: "commentId1", authorId: authorId, postId: "postId1", comment: "comment1", createdAt: new Date('2023-11-13T13:37:31.056Z')},
            {id: "commentId2", authorId: authorId, postId: "postId2", comment: "comment2", createdAt: new Date('2023-11-13T13:37:31.056Z')},
            {id: "commentId3", authorId: authorId, postId: "commentId2", comment: "comment3", createdAt: new Date('2023-11-13T13:37:31.056Z')},
            {id: "commentId4", authorId: authorId, postId: "postId4", comment: "comment4", createdAt: new Date('2023-11-13T13:37:31.056Z')},
        ]));
    })
    test('It should throw NotFoundException as the user does not make any comments.', async () =>{
        const userId: string = 'userId'
        const authorId: string = 'privateAccount'

        try {
            await commentService.getCommentsByAuthorId(userId, authorId)
            fail('Expected NotFoundException but no exception was thrown');
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    })
})