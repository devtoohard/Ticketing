import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";
import jwt from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  // const email = "test@test.com";
  // const password = "password";

  // const response = await request(app)
  //   .post("/api/users/signup")
  //   .send({ email, password })
  //   .expect(201);

  // const cookie = response.get("Set-Cookie");

  // return cookie;

  //1. Build a JWT payload {id, email} //
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };
  //2. Create the JWT! //
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  //3. Build session object {jwt: MY_JWT}//
  const session = { jwt: token };
  //4. Turn that session into JSON //
  const sessionJSON = JSON.stringify(session);
  //5. Take JSON and encode it as base64//
  const base64 = Buffer.from(sessionJSON).toString("base64");
  //6. Return a string that is a cookie with encoded data //
  return [`express:sess=${base64}`];
};
