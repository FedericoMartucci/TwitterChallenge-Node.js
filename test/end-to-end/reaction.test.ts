import request from "supertest"
import { app } from "../../src/server"
import { generateAccessToken } from "../../src/utils"
import { ReactionDTO } from "../../src/domains/reaction/dto"

describe('/api/reaction/:postId', () => {
    test('This endpoint should let a user to react a post returning info about it.', async () => {
        const postId: string = 'b3bf25f3-369b-473a-a586-1e2e6ff25387'
        const requestBody = {
            reactionType: "LIKE"
        };
        const token = generateAccessToken({ userId: 'userId' })
        
        const response = await request(app).post(`/api/reaction/${postId}`)
                            .set("Authorization", `Bearer ${token}`)
                            .send(requestBody);

        expect(response.statusCode).toBe(200);
        expect(response.text).toBeInstanceOf(ReactionDTO);
    })
})