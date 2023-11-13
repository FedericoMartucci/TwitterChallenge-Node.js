import { PostRepository } from "../../src/domains/post/repository"
import { CursorPagination } from "../../src/types";
import { CreatePostInputDTO, ExtendedPostDTO, PostDTO } from "../../src/domains/post/dto";

export class PostRepositoryTestImpl implements PostRepository{
    async create(userId: string, data: CreatePostInputDTO): Promise<PostDTO>{
        return new PostDTO({
            id: "post-uuid32",
            authorId: userId,
            content: data.content,
            images: [],
            createdAt: new Date()
        })
    }

    async getAllByDatePaginated(userId: string, options: CursorPagination): Promise<ExtendedPostDTO[]> {
        
    }

    async delete(postId: string): Promise<void> {}
    async getById(userId: string, postId: string): Promise<PostDTO | null> {

    }

    async getByAuthorId(userId: string, authorId: string): Promise<ExtendedPostDTO[]> {

    }
}