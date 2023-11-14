import { PostRepository } from "../../src/domains/post/repository"
import { CursorPagination } from "../../src/types";
import { CreatePostInputDTO, ExtendedPostDTO, PostDTO } from "../../src/domains/post/dto";
import { UserDTO } from "../../src/domains/user/dto";

export class PostRepositoryTestImpl implements PostRepository{
    async create(userId: string, data: CreatePostInputDTO): Promise<PostDTO>{
        return new PostDTO({
            id: "postId",
            authorId: userId,
            content: data.content,
            images: [],
            createdAt: new Date()
        })
    }

    async getAllByDatePaginated(userId: string, options: CursorPagination): Promise<ExtendedPostDTO[]> {
        const posts: ExtendedPostDTO[] = [
            {id: "post1", authorId: "authorId", content: "post1", images: [], createdAt: new Date('2023-11-13T13:37:31.056Z'), author: new UserDTO({id: userId, name: 'name', createdAt: new Date('2023-11-13T13:37:31.056Z'), isPrivate: false, profilePicture: null}), qtyLikes: 1, qtyRetweets: 2, qtyComments: 3},
            {id: "post2", authorId: "authorId", content: "post2", images: [], createdAt: new Date('2023-11-13T13:37:31.056Z'), author: new UserDTO({id: userId, name: 'name', createdAt: new Date('2023-11-13T13:37:31.056Z'), isPrivate: false, profilePicture: null}), qtyLikes: 1, qtyRetweets: 2, qtyComments: 3},
            {id: "post3", authorId: "authorId2", content: "post3", images: [], createdAt: new Date('2023-11-13T13:37:31.056Z'), author: new UserDTO({id: userId, name: 'name', createdAt: new Date('2023-11-13T13:37:31.056Z'), isPrivate: false, profilePicture: null}), qtyLikes: 1, qtyRetweets: 2, qtyComments: 3},
            {id: "post4", authorId: "authorId3", content: "post4", images: [], createdAt: new Date('2023-11-13T13:37:31.056Z'), author: new UserDTO({id: userId, name: 'name', createdAt: new Date('2023-11-13T13:37:31.056Z'), isPrivate: false, profilePicture: null}), qtyLikes: 1, qtyRetweets: 2, qtyComments: 3},
        ]
        return posts.filter(post => post.authorId === userId);
    }

    async delete(postId: string): Promise<void> {}
    async getById(userId: string, postId: string): Promise<PostDTO | null> {
        const post: PostDTO = new PostDTO({id: postId, authorId: 'userId', content: "example post", images: [], createdAt: new Date()});
        return postId === 'non-existing-post-id' ? null : post;
    }

    async getByAuthorId(userId: string, authorId: string): Promise<ExtendedPostDTO[]> {
        const posts: ExtendedPostDTO[] = [
            {id: "post1", authorId: "authorId", content: "post1", images: [], createdAt: new Date('2023-11-13T13:37:31.056Z'), author: new UserDTO({id: authorId, name: 'name', createdAt: new Date('2023-11-13T13:37:31.056Z'), isPrivate: false, profilePicture: null}), qtyLikes: 1, qtyRetweets: 2, qtyComments: 3},
            {id: "post2", authorId: "authorId", content: "post2", images: [], createdAt: new Date('2023-11-13T13:37:31.056Z'), author: new UserDTO({id: authorId, name: 'name', createdAt: new Date('2023-11-13T13:37:31.056Z'), isPrivate: false, profilePicture: null}), qtyLikes: 1, qtyRetweets: 2, qtyComments: 3},
            {id: "post3", authorId: "authorId2", content: "post3", images: [], createdAt: new Date('2023-11-13T13:37:31.056Z'), author: new UserDTO({id: authorId, name: 'name', createdAt: new Date('2023-11-13T13:37:31.056Z'), isPrivate: false, profilePicture: null}), qtyLikes: 1, qtyRetweets: 2, qtyComments: 3},
            {id: "post4", authorId: "authorId3", content: "post4", images: [], createdAt: new Date('2023-11-13T13:37:31.056Z'), author: new UserDTO({id: authorId, name: 'name', createdAt: new Date('2023-11-13T13:37:31.056Z'), isPrivate: false, profilePicture: null}), qtyLikes: 1, qtyRetweets: 2, qtyComments: 3},
        ]
        return posts.filter(post => post.authorId === authorId);
    }
}