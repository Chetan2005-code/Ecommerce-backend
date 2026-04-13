import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let cookie;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const uniqueEmail = `test${Date.now()}@gmail.com`;

  // register
  await request(app).post("/api/auth/register").send({
    name: "Test User",
    email: uniqueEmail,
    password: "123456",
  });

  // login
  const loginRes = await request(app).post("/api/auth/login").send({
    email: uniqueEmail,
    password: "123456",
  });

  cookie = loginRes.headers["set-cookie"];
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User API Tests", () => {

  it("should get user profile", async () => {
    const res = await request(app)
      .get("/api/users/profile")
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
  });

  it("should update user profile", async () => {
    const res = await request(app)
      .put("/api/users/profile")
      .set("Cookie", cookie)
      .send({
        name: "Updated Name",
      });

    expect(res.statusCode).toBe(200);
  });

});