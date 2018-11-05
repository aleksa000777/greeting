/* eslint-disable */
const request = require("supertest");
const api = require("./index");

const getGreeting = () => {
  const date = new Date();
  const hours = date.getHours();
  const timeZone = api.getTimeZone(hours);
  let greeting = "";

  switch (timeZone) {
    case 1:
      greeting = "Good Morning";
      break;
    case 2:
      greeting = "Good Afternoon";
      break;
    default:
      greeting = "Good Evening";
  }
  return greeting;
};

describe("get greeting", () => {
  it("greeting", () => {
    expect.assertions(1);
    return api
      .apiCall("toby")
      .then(data => expect(data).toEqual(`${getGreeting()} toby`));
  });
});

describe("Flow API", () => {
  it("get greeting with name", () =>
    request(api.app)
      .get('/api?name="toby2')
      .expect(200)
      .then(res => {
        expect(typeof res.body.data).toBe("string");
        expect(res.body.data).toBe(`${getGreeting()} \"toby2`);
      }));
});
