import { CursorPagination } from '@types'
import { CreatePostInputDTO, ExtendedPostDTO, PostDTO } from '../dto'

export interface PostRepository {
  create: (userId: string, data: CreatePostInputDTO) => Promise<PostDTO>
  getAllByDatePaginated: (userId: string, options: CursorPagination) => Promise<ExtendedPostDTO[]>
  delete: (postId: string) => Promise<void>
  getById: (userId: string, postId: string) => Promise<PostDTO | null>
  getByAuthorId: (userId: string, authorId: string) => Promise<ExtendedPostDTO[]>
}
