import request from "supertest"
import { app } from "../../src/server"
import { generateAccessToken } from "../../src/utils"
import { PostDTO } from "../../src/domains/post/dto"

describe('/api/post/', () => {
    test('This endpoint allows a user to create a post.', async () => {
        const requestBody = {
            content: "post's content"
        };
        const token = generateAccessToken({ userId: 'userId' })
        
        const response = await request(app).post(`/api/post`)
                            .set("Authorization", `Bearer ${token}`)
                            .send(requestBody);

        expect(response.statusCode).toBe(200);
        expect(response.text).toBeInstanceOf(PostDTO);
    })
})