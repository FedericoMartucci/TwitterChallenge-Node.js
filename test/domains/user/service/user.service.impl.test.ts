import { UserService, UserServiceImpl } from "../../../../src/domains/user/service"
import { UserViewDTO } from "../../../../src/domains/user/dto"
import { NotFoundException } from "../../../../src/utils/errors"
import { UserRepositoryTestImpl } from "../../../mocks/user.repository.test.impl"

const userService: UserService = new UserServiceImpl(new UserRepositoryTestImpl())

describe('getUser return the user\'s info or null if it does not find any matching id', () => {
    test('It should get user\'s info.', async () => {
        const requestParams = {
            userId: "user-uuid32"
        };

        const user: UserViewDTO|null = await userService.getUser(requestParams);

        expect(user).toBeInstanceOf(UserViewDTO);
    });
    test('It should throw NotFoundException.', async () => {
        const requestParams = {
            userId: "nonexisting-user-id"
        };

        try {
            await userService.getUser(requestParams);

            fail('Expected NotFoundException but no exception was thrown');
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    });
    
});

describe('getUserRecommendations returns a list of users', () => {
    test.skip('It should return a list of UserView', async () => {
    const userList: any = {};
    expect(userList).toBe(userList instanceof UserViewDTO);
  });
});