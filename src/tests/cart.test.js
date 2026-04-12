import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let cookie;
let productId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // 🔐 Login to get cookie
  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({
      email: "testuser@gmail.com",
      password: "123456",
    });

  cookie = loginRes.headers["set-cookie"];

  // 📦 Get a product id
  const productRes = await request(app).get("/api/products");
  productId = productRes.body.products[0]._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Cart API Tests", () => {

  it("should add item to cart", async () => {
    const res = await request(app)
      .post("/api/cart")
      .set("Cookie", cookie)
      .send({
        productId,
        quantity: 2,
      });

    expect(res.statusCode).toBe(200);
  });

  it("should get cart", async () => {
    const res = await request(app)
      .get("/api/cart")
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
  });

});
