import { MessageService, MessageServiceImpl } from "../../../src/domains/message/service"
import { ForbiddenException, NotFoundException } from "../../../src/utils";
import { FollowerRepositoryTestImpl } from "../../mocks/follower.repository.test.impl";
import { MessageRepositoryTestImpl } from "../../mocks/message.repository.test.impl";
import { MessageDTO, MessageInputDTO } from "../../../src/domains/message/dto";

const messageService: MessageService = new MessageServiceImpl(new MessageRepositoryTestImpl(), new FollowerRepositoryTestImpl())

describe('sendMessage store a message sent by a user in the db.', () => {
    test('It should return a MessageDTO.', async () => {
        const userId: string = 'already-following-userId'
        const messageData: MessageInputDTO = {text: 'messageText', from: 'already-following-userId', to: 'already-following-userId', username: 'username'}
        const message: MessageDTO = await messageService.sendMessage(messageData)

        expect(message).toBeInstanceOf(MessageDTO)
    })
    test('It should throw ForbiddenException as the users do not follow each other.', async () => {
        const userId: string = 'userId'
        const messageData: MessageInputDTO = {text: 'messageText', from: 'fromId', to: 'toId', username: 'username'}

        try {
            await messageService.sendMessage(messageData)
            fail('Expected ForbiddenException but no exception was thrown');
        } catch (error) {
            expect(error).toBeInstanceOf(ForbiddenException);
        }
    })
})

describe('getMessages allows the user to retrieve all messages sended to him by another user.', () => {
    test('It should return a list of MessageDTO.', async () => {
        const fromId: string = 'fromId'
        const toId: string = 'toId'
        
        const messages: MessageDTO[] = await messageService.getMessages(toId, fromId)

        expect(messages).toEqual(expect.arrayContaining<MessageDTO>([
            {id: 'messageId1', fromId: fromId, toId: toId, text: 'messageText', createdAt: new Date('2023-11-13T13:37:31.056Z')},
            {id: 'messageId2', fromId: fromId, toId: toId, text: 'messageText', createdAt: new Date('2023-11-13T13:37:31.056Z')},
            {id: 'messageId3', fromId: fromId, toId: toId, text: 'messageText', createdAt: new Date('2023-11-13T13:37:31.056Z')},
            {id: 'messageId4', fromId: fromId, toId: toId, text: 'messageText', createdAt: new Date('2023-11-13T13:37:31.056Z')},
        ]));
    })
    test('It should throw NotFoundException as there are not any messages to retrieve.', async () => {
        const fromId: string = 'not-found-messages-fromId'
        const toId: string = 'toId'

        try {
            await messageService.getMessages(toId, fromId)
            fail('Expected NotFoundException but no exception was thrown');
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    })
})