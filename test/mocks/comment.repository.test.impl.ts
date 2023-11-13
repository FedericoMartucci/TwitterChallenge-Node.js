import { CommentRepository } from "../../src/domains/comment/repository"
import { CursorPagination } from "../../src/types";
import { CreatePostInputDTO, ExtendedPostDTO, PostDTO } from "../../src/domains/post/dto";
import { CommentInputDTO, CommentDTO } from "../../src/domains/comment/dto";

export class CommentRepositoryTestImpl implements CommentRepository{
    async createComment (userId: string, postId: string, commentInput: CommentInputDTO): Promise<CommentDTO>{
        return new CommentDTO(  "commentId",
                                userId,
                                postId,
                                commentInput.comment,
                                new Date()
                            )
    }
    async getByAuthorId (userId: string, authorId: string): Promise<CommentDTO[]>{
        const comments: CommentDTO[] = [
            {id: "commentId1", authorId: authorId, postId: "postId1", comment: "comment1", createdAt: new Date()},
            {id: "commentId2", authorId: authorId, postId: "postId2", comment: "comment2", createdAt: new Date()},
            {id: "commentId3", authorId: authorId, postId: "commentId2", comment: "comment3", createdAt: new Date()},
            {id: "commentId4", authorId: authorId, postId: "postId4", comment: "comment4", createdAt: new Date()},
        ]
        const emptyComments: CommentDTO[] = [];
        return authorId === "privateAccount"? emptyComments : comments;
    }
    async getByPostId (userId: string, postId: string, options: CursorPagination): Promise<ExtendedPostDTO[]>{
        const comments: ExtendedPostDTO[] = [
            {id: "commentId1", authorId: "authorId1", content: "comment1", images: [], createdAt: new Date(), author: "", qtyLikes: 1, qtyRetweets: 2, qtyComments: 3},
            {id: "commentId2", authorId: "authorId2", content: "comment2", images: [], createdAt: new Date(), author: "", qtyLikes: 1, qtyRetweets: 2, qtyComments: 3},
            {id: "commentId3", authorId: "authorId3", content: "comment3", images: [], createdAt: new Date(), author: "", qtyLikes: 1, qtyRetweets: 2, qtyComments: 3},
            {id: "commentId4", authorId: "authorId4", content: "comment4", images: [], createdAt: new Date(), author: "", qtyLikes: 1, qtyRetweets: 2, qtyComments: 3},
        ]
        const emptyComments: ExtendedPostDTO[] = [];
        return postId === "non-existing-comments"? emptyComments : comments;
    }
}