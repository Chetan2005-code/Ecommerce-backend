import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let cookie;
let productId;

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

  // get product
  const productRes = await request(app).get("/api/products");
  productId = productRes.body.products[0]._id;

  // add to cart
  await request(app)
    .post("/api/cart")
    .set("Cookie", cookie)
    .send({
      productId,
      quantity: 2,
    });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Order API Tests", () => {

  it("should create order", async () => {
    const res = await request(app)
      .post("/api/orders")
      .set("Cookie", cookie)
      .send({
        address: "Bhopal, MP",
        paymentMethod: "COD",
      });

    expect(res.statusCode).toBe(201);
  });

  it("should get user orders", async () => {
    const res = await request(app)
      .get("/api/orders")
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
  });

});