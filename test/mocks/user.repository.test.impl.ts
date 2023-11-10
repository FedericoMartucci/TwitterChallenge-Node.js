import { ExtendedUserDTO, UserDTO, UserViewDTO } from "../../src/domains/user/dto"
import { SignupInputDTO } from "../../src/domains/auth/dto"
import { UserRepository } from "../../src/domains/user/repository"
import { CursorPagination, OffsetPagination } from "../../src/types";

export class UserRepositoryTestImpl implements UserRepository {
  
    async create (data: SignupInputDTO): Promise<UserDTO> {
        const user = {id: 'user-uuid32', name: 'name', createdAt: new Date(), isPrivate: data.isPrivate, profilePicture: null};
        return new UserDTO(user)
    }
  
    async getUserViewById (userId: any): Promise<UserViewDTO | null> {
      const user = {id: userId, name: 'name', username: "username", followsYou: false, profilePicture: null};
      console.log(user.id)
      if(userId === 'nonexisting-user-id')
        return null
  
      return new UserViewDTO({
          id: user.id,
          name: user.name,
          username: user.username,
          followsYou: user.followsYou,
          profilePicture: user.profilePicture
        })
    }
  
    async getById (userId: any): Promise<UserDTO | null> {
        const user = {id: userId, name: 'name', createdAt: new Date(), isPrivate: false, profilePicture: null};
        
        return user.id !== 'nonexisting-user-id'? new UserDTO({
            id: user.id,
            name: user.name,
            createdAt: user.createdAt,
            isPrivate: user.isPrivate,
            profilePicture: user.profilePicture
          }) : null
    }
  
    async delete (userId: any): Promise<void> {}
  
    async getRecommendedUsersPaginated (options: OffsetPagination): Promise<UserViewDTO[]> {
        const users = [
            {id: "user1-uuid32", name: "user1", username: "username1", followsYou: false, profilePicture: null},
            {id: "user2-uuid32", name: "user2", username: "username2", followsYou: true, profilePicture: null},
            {id: "user3-uuid32", name: "user3", username: "username3", followsYou: false, profilePicture: null},
            {id: "user4-uuid32", name: "user4", username: "username4", followsYou: true, profilePicture: null},
        ];

        return users.map(users => new UserViewDTO(users));
    }
  
    async getByEmailOrUsername (email?: string, username?: string): Promise<ExtendedUserDTO | null> {
        const user = {id: "user-uuid32", name: 'name', createdAt: new Date(), isPrivate: false, profilePicture: null, email: email, username: username, password: "password"};
        if(user.email === undefined || user.username === undefined)
          return null
    
        return new ExtendedUserDTO({
            id: user.id,
            name: user.name,
            createdAt: user.createdAt,
            isPrivate: user.isPrivate,
            profilePicture: user.profilePicture,
            email: user.email,
            username: user.username,
            password: user.password
          })
    }
  
    async getUsersByUsername (userId: string, username: string, options: CursorPagination): Promise<UserViewDTO[]|null>{
        const users = [
                {id: "user1-uuid32", name: "user1", username: "user1 - matchingUsername", followsYou: false, profilePicture: null},
                {id: "user2-uuid32", name: "user2", username: "user2 - matchingUsername", followsYou: true, profilePicture: null},
                {id: "user3-uuid32", name: "user3", username: "user3", followsYou: false, profilePicture: null},
                {id: "user4-uuid32", name: "user4", username: "user4", followsYou: true, profilePicture: null},
            ]
        const matchingUsers = users.filter(user => user.username.includes(username));
      
      return matchingUsers.length !== 0 ? matchingUsers.map(users => new UserViewDTO(users)) : null
    }
  
    async isExistingId (userId: any): Promise<boolean> {
      return userId !== 'nonexisting-user-id' ? true : false
    }
    async updatePrivacy(userId: any, isPrivate: boolean): Promise<void>{}
    async updateProfilePicture (userId: string, downloadURL: string): Promise<void>{}
}