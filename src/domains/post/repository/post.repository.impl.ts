import { PrismaClient } from '@prisma/client'

import { CursorPagination } from '../../../types'

import { PostRepository } from '.'
import { CreatePostInputDTO, ExtendedPostDTO, PostDTO } from '../dto'

export class PostRepositoryImpl implements PostRepository {
  constructor (private readonly db: PrismaClient) {}

  async create (userId: string, data: CreatePostInputDTO): Promise<PostDTO> {
    const post = await this.db.post.create({
      data: {
        authorId: userId,
        ...data
      }
    })
    return new PostDTO(post)
  }

  async getAllByDatePaginated (userId: string, options: CursorPagination): Promise<ExtendedPostDTO[]> {
    const posts = await this.db.post.findMany({
      where: {
        OR: [
          {
            author: {
              isPrivate: false,
            },
          },
          {
            author: {
              followers: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
        ],
        commentsInfo: {
          every: {
              commentId: undefined,
          }
        }
      },
      cursor: options.after ? { id: options.after } : (options.before) ? { id: options.before } : undefined,
      skip: options.after ?? options.before ? 1 : undefined,
      take: options.limit ? (options.before ? -options.limit : options.limit) : undefined,
      orderBy: [
        {
          createdAt: 'desc'
        },
        {
          id: 'asc'
        }
      ],
      include: {
        author: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            isPrivate: true,
            profilePicture: true,
          },
        },
        reactions: true,
        commentsInfo: true,
      }
    })
    const extendedPostDTOs: ExtendedPostDTO[] = posts.map(comment => { 
        const qtyLikes: number = posts.reduce((totalLikes, comment) => {
        const likesInPost = comment.reactions.filter(reaction => reaction.reactionType === 'LIKE').length;
        return totalLikes + likesInPost;
      }, 0);
    const qtyRetweets: number = posts.reduce((totalRetweets, comment) => {
        const retweetsInPost = comment.reactions.filter(reaction => reaction.reactionType === 'RETWEET').length;
        return totalRetweets + retweetsInPost;
      }, 0);
    const qtyComments: number = posts.reduce((totalComments, comment) => {
        const commentsInPost = comment.commentsInfo.length;
        return totalComments + commentsInPost;
      }, 0);
    
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
    })});
  return extendedPostDTOs

  }

  async delete (postId: string): Promise<void> {
    await this.db.post.delete({
      where: {
        id: postId
      }
    })
  }

  async getById (userId: string, postId: string): Promise<PostDTO | null> {
    const post = await this.db.post.findUnique({
      where: {
        OR:[
          {
            authorId : userId,
          },
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
            author: {
              isPrivate: false,
            },
          },
        ],
        id: postId,
      }
    })
    return (post != null) ? new PostDTO(post) : null
  }

  async getByAuthorId (userId: string, authorId: string): Promise<ExtendedPostDTO[]> {
    const posts = await this.db.post.findMany({
      where: {
        authorId: authorId,
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
        ],
        commentsInfo: {
          none: {
              userId: authorId,
          }
        }
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            isPrivate: true,
            profilePicture: true,
          },
        },
        reactions: true,
        commentsInfo: true,
      }
    })
    const extendedPostDTOs: ExtendedPostDTO[] = posts.map(comment => { 
          const qtyLikes: number = posts.reduce((totalLikes, comment) => {
          const likesInPost = comment.reactions.filter(reaction => reaction.reactionType === 'LIKE').length;
          return totalLikes + likesInPost;
      }, 0);
      const qtyRetweets: number = posts.reduce((totalRetweets, comment) => {
          const retweetsInPost = comment.reactions.filter(reaction => reaction.reactionType === 'RETWEET').length;
          return totalRetweets + retweetsInPost;
      }, 0);
      const qtyComments: number = posts.reduce((totalComments, comment) => {
          const commentsInPost = comment.commentsInfo.length;
          return totalComments + commentsInPost;
      }, 0);
      
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
  })});
  return extendedPostDTOs
  }
}


