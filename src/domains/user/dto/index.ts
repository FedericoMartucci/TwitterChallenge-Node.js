import { IsAlphanumeric, IsNotEmpty, IsString, MaxLength } from "class-validator"

export class UserDTO {
  constructor (user: UserDTO) {
    this.id = user.id
    this.name = user.name
    this.createdAt = user.createdAt
    this.isPrivate = user.isPrivate
    this.profilePicture = user.profilePicture
  }

  id: string
  name: string | null
  createdAt: Date
  isPrivate: boolean
  profilePicture: string | null | undefined
}

export class ExtendedUserDTO extends UserDTO {
  constructor (user: ExtendedUserDTO) {
    super(user)
    this.email = user.email
    this.name = user.name
    //this.password = user.password
  }

  email!: string
  username!: string
  password!: string
  
}
export class UserViewDTO {
  constructor (user: UserViewDTO) {
    this.id = user.id
    this.name = user.name
    this.username = user.username
    this.followsYou = user.followsYou
    this.profilePicture = user.profilePicture
  }

  id: string
  name: string | null
  username: string
  followsYou?: boolean
  profilePicture: string | null
}

export class ProfilePictureDTO {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  name!: string

  @IsString()
  @MaxLength(4)
  @IsNotEmpty()
  extension!: string

  constructor (name: string, extension: string) {
    this.name = name
    this.extension = extension
  }
}