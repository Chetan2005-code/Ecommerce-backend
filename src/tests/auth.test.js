import  request  from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {jest} from "@jest/globals"
dotenv.config();

jest.setTimeout(10000);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});




describe("Auth API Tests", () => {

  //  REGISTER TEST
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: `test${Date.now()}@gmail.com`,
        password: "123456",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message");
  });

  //  LOGIN TEST
  it("should login user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "testuser@gmail.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  //  LOGOUT TEST
  it("should logout user", async () => {
    const res = await request(app)
      .post("/api/auth/logout");
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

});