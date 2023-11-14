import { UserService, UserServiceImpl } from "../../src/domains/user/service"
import { ProfilePictureDTO, UserViewDTO } from "../../src/domains/user/dto"
import { NotFoundException } from "../../src/utils/errors"
import { UserRepositoryTestImpl } from "../mocks/user.repository.test.impl"

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
        const userId: string = 'nonexisting-user-id'

        try {
            await userService.getUser(userId);
            fail('Expected NotFoundException but no exception was thrown');
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    });
    
});

describe('getUserRecommendations returns a list of users', () => {
    test('It should return a list of UserView', async () => {
        const { limit, skip } = {limit: 5, skip: 6}

        const users = await userService.getUserRecommendations("userId", { limit: Number(limit), skip: Number(skip) })

        expect(users).toEqual(expect.arrayContaining<UserViewDTO>([
            {id: "user1-uuid32", name: "user1", username: "username1", followsYou: false, profilePicture: null},
            {id: "user2-uuid32", name: "user2", username: "username2", followsYou: true, profilePicture: null},
            {id: "user3-uuid32", name: "user3", username: "username3", followsYou: false, profilePicture: null},
            {id: "user4-uuid32", name: "user4", username: "username4", followsYou: true, profilePicture: null},
        ]));
  });
});

describe('getUsersByUsername return a list of users which their names matches with a username passed as a parameter', () => {
    test('It should return a list of UserView', async() => {
        const userId: string = "userId";
        const username: string = "matchingUsername";
        const { limit } = {limit: 5}
        const users = await userService.getUsersByUsername (userId, username, { limit: Number(limit) });

        expect(users).toEqual(expect.arrayContaining<UserViewDTO>([
            {id: "user1-uuid32", name: "user1", username: "user1 - matchingUsername", followsYou: false, profilePicture: null},
            {id: "user2-uuid32", name: "user2", username: "user2 - matchingUsername", followsYou: true, profilePicture: null},
        ]));
    });
    test('It should throw NotFoundException', async() => {
        const userId: string = "userId";
        const username: string = "notMatchingUsername";
        const { limit } = {limit: 5}
        try {
            await userService.getUsersByUsername (userId, username, { limit: Number(limit) });
            fail('Expected NotFoundException but no exception was thrown');
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    });
})
describe('setUserProfilePicture return a presigned url to store the user\'s profile picture', () => {
    test('It should return a presigned url', async() => {
        const userId: string = "userId";
        const data: ProfilePictureDTO = {name: "testing", extension: ".png"};

        const presignedUrl = await userService.setUserProfilePicture(userId, data)

        expect(presignedUrl).toBe(`https://siriuschallenge.s3.amazonaws.com/${userId}-${data.name}${data.extension}`);
    });
})