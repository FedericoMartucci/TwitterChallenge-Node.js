import { LoginInputDTO, SignupInputDTO, TokenDTO } from "../../src/domains/auth/dto"
import { AuthService, AuthServiceImpl } from "../../src/domains/auth/service"
import { ProfilePictureDTO, UserViewDTO } from "../../src/domains/user/dto"
import { ConflictException, NotFoundException, UnauthorizedException } from "../../src/utils/errors"
import { UserRepositoryTestImpl } from "../mocks/user.repository.test.impl"

const authService: AuthService = new AuthServiceImpl(new UserRepositoryTestImpl())

describe('signup let users to create an account', () => {
    test('It should return a TokenDTO meaning that the user has signed up successfully.', async () => {
        const data: SignupInputDTO = new SignupInputDTO('example@gmail.com', 'new-user', 'password');

        const token: TokenDTO = await authService.signup(data)

        expect(token).toBeInstanceOf(TokenDTO);
        expect(token.token).not.toBeNull();
    })
    test('It should throw ConflictException as the user is already in use.', async () => {
        const data: SignupInputDTO = new SignupInputDTO("alreadyUsedEmail", "alreadyUsedUsername", 'password');
        try{
            await authService.signup(data)
            fail('Expected ConflictException but no exception was thrown');
        }catch(error){
            expect(error).toBeInstanceOf(ConflictException)
        }
    })
})

describe('login let user to login in his account', () => {
    test('It should return a TokenDTO meaning that the user has logged successfully.', async () => {
        const data: LoginInputDTO = {email: 'example@gmail.com', username: 'username', password: 'password'};

        const token: TokenDTO = await authService.login(data)

        expect(token).toBeInstanceOf(TokenDTO);
        expect(token.token).not.toBeNull();
    })
    test('It should throw NotFoundException as the user was not found.', async () => {
        const data: LoginInputDTO = {email: undefined, username: undefined, password: 'password'};
        try{
            await authService.login(data)
            fail('Expected NotFoundException but no exception was thrown');
        }catch(error){
            expect(error).toBeInstanceOf(NotFoundException)
        }
    })
    test('It should throw UnauthorizedException as the password is wrong.', async () => {
        const data: LoginInputDTO = {email: 'example@gmail.com', username: 'username', password: 'wrongPassword'};
        try{
            await authService.login(data)
            fail('Expected UnauthorizedException but no exception was thrown');
        }catch(error){
            expect(error).toBeInstanceOf(UnauthorizedException)
        }
    })
})