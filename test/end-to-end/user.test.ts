import request from "supertest"
import { app } from "../../src/server"
import { UserDTO } from "../../src/domains/user/dto"
import { generateAccessToken } from "../../src/utils"

describe('/api/user/', () => {
    test('This endpoint should return user recommendations.', async () => {
        const token = generateAccessToken({ userId: 'userId' })
        
        const response = await request(app).get(`/api/user`)
                            .set("Authorization", `Bearer ${token}`)

        expect(response.statusCode).toBe(200);
        expect(response.text).toBeInstanceOf(UserDTO);
    })
})