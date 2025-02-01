const request = require("supertest");
const {app} = require("./app.js");


describe("GET /", () => {beforeAll(() => {
    jest.setTimeout(10000);
});

    it("Should be ok", async () => {
        const res = await request(app).get("/");
        console.log({res})
        expect(res.statusCode).toBe(200);
    });
});