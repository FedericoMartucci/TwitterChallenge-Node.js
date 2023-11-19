import { PrismaClient } from '@prisma/client'

import { CursorPagination } from '../../../types'

import { PostRepository } from '.'
import { CreatePostInputDTO, ExtendedPostDTO, PostDTO } from '../dto'
import { db } from '@utils'

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
          none: {},
        },
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
      }
    })


    const extendedPostDTOs: Promise<ExtendedPostDTO[]> = Promise.all(posts.map(async post => { 
        const qtyLikes: number = post.reactions.filter(reaction => reaction.reactionType === 'LIKE').length
        const qtyRetweets = post.reactions.filter(reaction => reaction.reactionType === 'RETWEET').length;
        const qtyComments = await getQtyCommentsByPost(post)
    
    return new ExtendedPostDTO({
        id: post.id,
        authorId: post.authorId,
        content: post.content,
        images: post.images,
        createdAt: post.createdAt,
        author: post.author,
        qtyLikes,
        qtyRetweets,
        qtyComments,
    })}));
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
    const extendedPostDTOs: Promise<ExtendedPostDTO[]> = Promise.all(posts.map(async post => { 
      const qtyLikes: number = post.reactions.filter(reaction => reaction.reactionType === 'LIKE').length
      const qtyRetweets = post.reactions.filter(reaction => reaction.reactionType === 'RETWEET').length;
      const qtyComments: number = await getQtyCommentsByPost(post)
      
      return new ExtendedPostDTO({
          id: post.id,
          authorId: post.authorId,
          content: post.content,
          images: post.images,
          createdAt: post.createdAt,
          author: post.author,
          qtyLikes,
          qtyRetweets,
          qtyComments,
  })}));
  return extendedPostDTOs
  }
}

export async function getQtyCommentsByPost(post: any): Promise<number> {
  const commentsByPost = await db.commentInfo.groupBy({
    by: ['postId'],
    _count: true,
    where: {
      postId: post.id
      }
  });
  //TODO: ask about recursivity to count comments' comments by post.
  return commentsByPost.length > 0 && commentsByPost[0]._count? commentsByPost[0]._count : 0
}