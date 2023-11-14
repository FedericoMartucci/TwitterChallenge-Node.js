import request from "supertest"
import { app } from "../../src/server"
import { generateAccessToken } from "../../src/utils"
import { FollowDTO } from "../../src/domains/follower/dto"

describe('/api/follow/:userId', () => {
    test('This endpoint should let a user follow another user returning info about it.', async () => {
        const userId: string = 'ab4e5b0b-5347-49ce-b7fa-d321127be80c'

        const token = generateAccessToken({ userId: 'userId' })
        
        const response = await request(app).post(`/api/follow/${userId}`)
                            .set("Authorization", `Bearer ${token}`)

        expect(response.statusCode).toBe(200);
        expect(response.text).toBeInstanceOf(FollowDTO);
    })
})