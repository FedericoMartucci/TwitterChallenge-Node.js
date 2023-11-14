import { PostRepository } from "../../src/domains/post/repository"
import { CursorPagination } from "../../src/types";
import { CreatePostInputDTO, ExtendedPostDTO, PostDTO } from "../../src/domains/post/dto";

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
        const returnValue: ExtendedPostDTO[] = [];
        return returnValue;
    }

    async delete(postId: string): Promise<void> {}
    async getById(userId: string, postId: string): Promise<PostDTO | null> {
        const post: PostDTO = new PostDTO({id: postId, authorId: 'userId', content: "example post", images: [], createdAt: new Date()});
        return postId === 'non-existing-post-id' ? null : post;
    }

    async getByAuthorId(userId: string, authorId: string): Promise<ExtendedPostDTO[]> {
        const returnValue: ExtendedPostDTO[] = [];
        return returnValue;
    }
}