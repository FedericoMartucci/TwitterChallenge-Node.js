import { ExtendedPostDTO } from "../../../domains/post/dto";
import { CommentRepository } from "./comment.repository";
import { CommentDTO, CommentInputDTO } from "../dto";
import { PrismaClient } from "@prisma/client";
import { CursorPagination } from "../../../types";

export class CommentRepositoryImpl implements CommentRepository{
    constructor (private readonly db: PrismaClient) {}
    async createComment(userId: string, postId: string, commentInput: CommentInputDTO): Promise<CommentDTO> {
        const comment = await this.db.post.create({
            data: {
                author: {
                    connect: { id: userId },
                  },
                content: commentInput.comment,
                commentsInfo: {
                    create: {
                        postId: postId,
                        userId: userId,
                    },
                },
            },
        })
        return new CommentDTO(comment.id, comment.authorId, postId, comment.content, comment.createdAt)
    }

    async getByAuthorId (userId: string, authorId: string): Promise<CommentDTO[]>{
        const comments = await this.db.post.findMany({
            where: {
                authorId: authorId,
                commentsInfo: {
                    some: {
                        userId: authorId, 
                    },
                },
                OR: [
                    {
                    author: {
                        followers: {
                        some: {
                            followerId: userId,
                        },
                        },
                    },
                    },
                    {
                        authorId: userId,
                    },
                    {
                        author: {
                          isPrivate: false,
                        },
                    },
                ],
            },
        })

        const commentIds = comments.map(comment => comment.id);

        const commentInfo = await this.db.commentInfo.findMany({
            where: {
                commentId: {
                    in: commentIds,
                },
            },
        })
        const commentDTOs = comments.map(comment => {
            const matchingCommentInfo = commentInfo.find(ci => ci.commentId === comment.id);
            const postId = matchingCommentInfo ? matchingCommentInfo.postId : '';
            return new CommentDTO(comment.id, comment.authorId, postId, comment.content, comment.createdAt);
          });
        
          return commentDTOs;
    }

    async getByPostId (userId: string, postId: string, options: CursorPagination): Promise<ExtendedPostDTO[]>{
        const comments = await this.db.post.findMany({
            where: {
                commentsInfo: {
                    some: {
                        postId: postId, 
                    },
                },
                OR: [
                    {
                        author: {
                            followers: {
                                some: {
                                    followerId: userId,
                                },
                            },
                        },
                    },
                    {
                        authorId: userId,
                    },
                    {
                        author: {
                          isPrivate: false,
                        },
                    },
                ],
            },
            cursor: options.after ? { id: options.after } : (options.before) ? { id: options.before } : undefined,
            skip: options.after ?? options.before ? 1 : undefined,
            take: options.limit ? (options.before ? -options.limit : options.limit) : undefined,
            orderBy: [
                {
                    reactions: {
                        _count: 'desc',
                    },
                },
            ],
            include: {
                reactions: true,
                commentsInfo: true,
                author: {
                    select: {
                      id: true,
                      name: true,
                      createdAt: true,
                      isPrivate: true,
                      profilePicture: true,
                    },
                  },
            },
        })
        
        const extendedPostDTOs: ExtendedPostDTO[] = comments.map(comment => {
            const qtyLikes = comment.reactions.filter(reaction => reaction.reactionType === 'LIKE').length;
            const qtyRetweets = comment.reactions.filter(reaction => reaction.reactionType === 'RETWEET').length;
            const qtyComments = comment.commentsInfo.filter(commentInfo => commentInfo.postId === comment.id).length;
        
            return new ExtendedPostDTO({
                id: comment.id,
                authorId: comment.authorId,
                content: comment.content,
                images: comment.images,
                createdAt: comment.createdAt,
                author: comment.author,
                qtyLikes,
                qtyRetweets,
                qtyComments,
            });
        });
        
        return extendedPostDTOs
    }
} 