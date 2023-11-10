import { AuthService, AuthServiceImpl } from "../../src/domains/auth/service"
import { ProfilePictureDTO, UserViewDTO } from "../../src/domains/user/dto"
import { NotFoundException } from "../../src/utils/errors"
import { UserRepositoryTestImpl } from "../mocks/user.repository.test.impl"

const authService: AuthService = new AuthServiceImpl(new UserRepositoryTestImpl())