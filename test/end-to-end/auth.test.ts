import request from "supertest"
import { app } from "../../src/server"
import { TokenDTO } from "../../src/domains/auth/dto"

describe('/api/auth/signup', () => {
    test('It should signup a user, return 201 and a token', async () => {
        const requestBody = {
            email: "testing@example.com",
            username: "username",
            password: "password"
        };

        const response = await request(app).post("/api/auth/signup").send(requestBody);

        expect(response.statusCode).toBe(201);
        expect(response.text).toBeInstanceOf(TokenDTO);
    });
});

describe('/api/auth/login', () => {
    test('This endpoint should allow a user to login returning a token.', async () => {
        const requestBody = {
            username: "username",
            password: "password"
        };

        const response = await request(app).post("/api/auth/login").send(requestBody);

        expect(response.statusCode).toBe(200);
        expect(response.text).toBeInstanceOf(TokenDTO);
    })
})