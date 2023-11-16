import request from "supertest"
import { app, server } from "../../src/server"
import { CommentDTO } from "../../src/domains/comment/dto";
import { generateAccessToken } from "../../src/utils";

describe('/api/comment/:postId', () => {
    test('This endpoint should allow the user to comment a post or another comment.', async () => {
        const postId: string = 'b3bf25f3-369b-473a-a586-1e2e6ff25387'
        const requestBody = {
            comment: "comment"
        };
        const token = generateAccessToken({ userId: 'userId' })
        
        const response = await request(app).post(`/api/comment/${postId}`)
                            .set("Authorization", `Bearer ${token}`)
                            .send(requestBody);

        expect(response.statusCode).toBe(200);
        expect(response.text).toBeInstanceOf(CommentDTO);
    })
})
afterAll((done) => {
    server.close(() => {
        done();
    });
});