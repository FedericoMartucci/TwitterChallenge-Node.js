import { CreatePostInputDTO, ExtendedPostDTO, PostDTO } from "../../src/domains/post/dto";
import { PostService, PostServiceImpl } from "../../src/domains/post/service"
import { UserDTO } from "../../src/domains/user/dto";
import { ForbiddenException, NotFoundException } from "../../src/utils";
import { PostRepositoryTestImpl } from "../mocks/post.repository.test.impl";

const postService: PostService = new PostServiceImpl(new PostRepositoryTestImpl())

describe('createPost returns post\'s info when it is created', () => {
    test('It should return a PostDTO which its info.', async () => {
        const userId: string = "userId"
        const body: CreatePostInputDTO = {content: "post's content"}

        const post: PostDTO = await postService.createPost(userId, body)

        expect(post).toBeInstanceOf(PostDTO)
    })
})

describe('deletePost throw an error if something wrong occurred or returns void', () => {
    test('It should return void as the post was deleted.', async () => {
        const userId: string = "userId";
        const postId: string = "postId";

        const deletePostSpy = jest.spyOn(PostRepositoryTestImpl.prototype, 'delete')
        const post: void = await postService.deletePost(userId, postId)
        
        expect(deletePostSpy).toHaveBeenCalled()
        deletePostSpy.mockRestore()
        
    })
    test('It should throw NotFoundException as the post does not exist.', async () => {
        const userId: string = "userId";
        const postId: string = "non-existing-post-id";
        try{
            const post = await postService.deletePost(userId, postId)
            fail('Expected NotFoundException but no exception was thrown');
        } catch(error){
            expect(error).toBeInstanceOf(NotFoundException)
        }
    });
    test('It should throw ForbiddenException as the post does not belong to user.', async () => {
        const userId: string = "authorId";
        const postId: string = "not-mine-postId";
        try{
            const post = await postService.deletePost(userId, postId)
            fail('Expected ForbiddenException but no exception was thrown');
        } catch(error){
            expect(error).toBeInstanceOf(ForbiddenException)
        }
    })
})

describe('getPost returns the info of a specific post', () => {
    test('It should return a PostDTO.', async () => {
        const userId: string = "userId";
        const postId: string = "postId";
        
        const post = await postService.getPost(userId, postId)
        expect(post).toBeInstanceOf(PostDTO)
    })
    test('It should throw NotFoundException as the post does not exist.', async () => {
        const userId: string = "userId";
        const postId: string = "non-existing-post-id";
        try{
            const post = await postService.getPost(userId, postId)
            fail('Expected NotFoundException but no exception was thrown');
        } catch(error){
            expect(error).toBeInstanceOf(NotFoundException)
        }
    });
})

describe('getLatestPost returns posts', () => {
    test('It should return a list of PostDTO.', async () => {
        const userId: string = "authorId";
        const {limit} = {limit: 5};
        
        const posts = await postService.getLatestPosts(userId, {limit: Number(limit)})
        expect(posts).toEqual(expect.arrayContaining<ExtendedPostDTO>([
            {id: "post1", authorId: "authorId", content: "post1", images: [], createdAt: new Date('2023-11-13T13:37:31.056Z'), author: new UserDTO({id: userId, name: 'name', createdAt: new Date('2023-11-13T13:37:31.056Z'), isPrivate: false, profilePicture: null}), qtyLikes: 1, qtyRetweets: 2, qtyComments: 3},
            {id: "post2", authorId: "authorId", content: "post2", images: [], createdAt: new Date('2023-11-13T13:37:31.056Z'), author: new UserDTO({id: userId, name: 'name', createdAt: new Date('2023-11-13T13:37:31.056Z'), isPrivate: false, profilePicture: null}), qtyLikes: 1, qtyRetweets: 2, qtyComments: 3},
        ]));
    })
    test('It should throw NotFoundException as any post was not found.', async () => {
        const userId: string = "userId";
        const {limit} = {limit: 5};
        try{
            const post = await postService.getLatestPosts(userId, {limit: Number(limit)})
            fail('Expected NotFoundException but no exception was thrown');
        } catch(error){
            expect(error).toBeInstanceOf(NotFoundException)
        }
    });
})
describe('getPostsByAuthor returns the info of a specific post', () => {
    test('It should return a list of PostDTO.', async () => {
        const userId: string = "userId";
        const authorId: string = "authorId";
        
        const posts = await postService.getPostsByAuthor(userId, authorId)
        expect(posts).toEqual(expect.arrayContaining<ExtendedPostDTO>([
            {id: "post1", authorId: "authorId", content: "post1", images: [], createdAt: new Date('2023-11-13T13:37:31.056Z'), author: new UserDTO({id: authorId, name: 'name', createdAt: new Date('2023-11-13T13:37:31.056Z'), isPrivate: false, profilePicture: null}), qtyLikes: 1, qtyRetweets: 2, qtyComments: 3},
            {id: "post2", authorId: "authorId", content: "post2", images: [], createdAt: new Date('2023-11-13T13:37:31.056Z'), author: new UserDTO({id: authorId, name: 'name', createdAt: new Date('2023-11-13T13:37:31.056Z'), isPrivate: false, profilePicture: null}), qtyLikes: 1, qtyRetweets: 2, qtyComments: 3},
        ]));
    })
    test('It should throw NotFoundException as any post was not found.', async () => {
        const userId: string = "userId";
        const authorId: string = "non-following-authorId";
        try{
            const post = await postService.getPostsByAuthor(userId, authorId)
            fail('Expected NotFoundException but no exception was thrown');
        } catch(error){
            expect(error).toBeInstanceOf(NotFoundException)
        }
    });
})