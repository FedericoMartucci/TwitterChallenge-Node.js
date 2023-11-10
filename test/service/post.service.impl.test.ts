import { CreatePostInputDTO, PostDTO } from "../../src/domains/post/dto";
import { PostService, PostServiceImpl } from "../../src/domains/post/service"
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
        
        const post = await postService.deletePost(userId, postId)
        expect(post).toBeDefined()
    })
    test('It should throw NotFoundException as the post does not exist.', async () => {
        const userId: string = "userId";
        const postId: string = "non-existing-postId";
        try{
            const post = await postService.deletePost(userId, postId)
            fail('Expected NotFoundException but no exception was thrown');
        } catch(error){
            expect(error).toBeInstanceOf(NotFoundException)
        }
    });
    test('It should throw ForbiddenException as the post does not belong to user.', async () => {
        const userId: string = "userId";
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
        const postId: string = "non-existing-postId";
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
        const userId: string = "userId";
        const {limit} = {limit: 5};
        
        const post = await postService.getLatestPosts(userId, {limit: Number(limit)})
        expect(post).toBeInstanceOf(PostDTO)
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
        
        const post = await postService.getPostsByAuthor(userId, authorId)
        expect(post).toBeInstanceOf(PostDTO)
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