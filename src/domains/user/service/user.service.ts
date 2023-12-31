import { CursorPagination, OffsetPagination } from '@types'
import { ProfilePictureDTO, UserDTO, UserViewDTO } from '../dto'

export interface UserService {
  deleteUser: (userId: any) => Promise<void>
  getUser: (userId: any, myId: string) => Promise<UserViewDTO>
  getUserRecommendations: (userId: any, options: OffsetPagination) => Promise<UserViewDTO[]>
  getUsersByUsername: (userId: string, username: string, options: CursorPagination) => Promise<UserViewDTO[]>
  setUserPrivacy: (userId: any, isPrivate: boolean) => Promise<void>
  setUserProfilePicture: (userId: string, data: ProfilePictureDTO) => Promise<string>
}
