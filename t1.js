import http from "k6/http";
import { sleep } from "k6";

const BASE_URL = "https://test-api.k6.io";
let authToken = "";

// "init code" is run only once per VU.
let userID = getRandomIntInclusive(1, 100);
console.log(`--- init code --- ${userID}`);

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// setup and teardown are only called once for a test.
export function setup() {
  console.log("--- setup code ---");
}

export default function (data) {
  console.log("--- VU(default) code ---");

  if (authToken === "") {
    console.log(`--- VU(default) code --- login ${userID}`);
    const loginUrl = `${BASE_URL}/auth/token/login/`;
    let loginPayload = JSON.stringify({
      username: `user${userID}`,
      password: `superCroc2019`,
    });
    let loginParams = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let loginRes = http.post(loginUrl, loginPayload, loginParams);
    authToken = loginRes.json("access");
  }

  console.log(`--- VU(default) code --- public ${userID}`);
  let params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };
  http.post(`${BASE_URL}/public/crocodiles/1/`, null, params);
  sleep(1);
}

export function teardown(data) {
  console.log("--- teardown code ---");
}
