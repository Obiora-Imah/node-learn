const request = require("supertest");
const app = require("../../app");
const { dbConnection, dbDisconnect } = require("../../services/mongo");

describe("group test", () => {
  beforeAll(async () => {
    await dbConnection();
  });

  afterAll(async () => {
    await dbDisconnect();
  });
  describe("GET /v1/launches", () => {
    test("It should respond with an array of launches", async () => {
      const response = await request(app).get("/v1/launches");
      expect(response.statusCode).toEqual(200);
    });
  });

  describe("POST /v1/launches", () => {
    test("It should respond with a 201 status code", async () => {
      const newLaunch = {
        mission: "Kepler",
        rocket: "Falcon 1",
        target: "Kepler-62 f",
      };
      const requestDate =  "2030-11-25";
      const response = await request(app)
        .post("/v1/launches")
        .send({...newLaunch, launchDate: requestDate,})
        .set("Content-Type", "application/json")
        .expect(201)
        // .expect("body", {...newLaunch, flightNumber: 101, upcoming: true, success: false, customers: ["ZTM", "NASA"]} );
      expect(new Date(response.body.launchDate).valueOf()).toEqual(new Date(requestDate).valueOf());
      expect(response.body).toMatchObject({...newLaunch, upcoming: true, success: false, customers: ["ZTM", "NASA"]});
    });
    test("It should create a new launch", async () => {
      const newLaunch = {
        mission: "Kepler",
        rocket: "Falcon 1",
        target: "Kepler-62 f",
        launchDate: "2030-11-25T00:00:00.000Z",
      };
      const response = await request(app)
        .post("/v1/launches")
        .send(newLaunch)
        .set("Content-Type", "application/json");
      expect(response.body).toMatchObject(newLaunch);
    });
    test("It should catch missing required properties", async () => {
      const newLaunch = {
        mission: "Kepler",
        launchDate: "2030-11-25",
      };
      const response = await request(app)
        .post("/v1/launches")
        .send(newLaunch)
        .set("Content-Type", "application/json");
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual({error: "Missing required launch property"});
    });
    test("It should catch invalid dates", async () => {
      const newLaunch = {
        mission: "Kepler",
        rocket: "Falcon 1",
        target: "Kepler-62 f",
        launchDate: "invalid date",
      };
      const response = await request(app)
        .post("/v1/launches")
        .send(newLaunch)
        .set("Content-Type", "application/json");
      expect(response.statusCode).toBe(400);
    });
  });
});