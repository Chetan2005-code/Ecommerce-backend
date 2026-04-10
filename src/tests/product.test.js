import  request  from "supertest";
import app from "../app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Product API Tests", () => {

  it("should get all products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
  });

});