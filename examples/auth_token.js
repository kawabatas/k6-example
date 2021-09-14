/**
 * Login VU in the init code.
 *
 * k6 run --iterations 3 examples/auth_token.js
 */
import http from "k6/http";
import { sleep } from "k6";

let authToken = "";
let userID = getRandomIntInclusive(1, 100);
console.log(`--- init code --- ${userID}`);

export default function () {
  console.log("--- VU(default) code ---");

  if (authToken === "") {
    console.log(`--- VU(default) code --- login ${userID}`);
    let loginPayload = JSON.stringify({
      username: `user${userID}`,
      password: `superCroc2019`,
    });
    let loginParams = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let loginRes = http.post(
      "https://test-api.k6.io/auth/token/login/",
      loginPayload,
      loginParams
    );
    authToken = loginRes.json("access");
  }

  console.log(`--- VU(default) code --- public ${userID}`);
  let params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };
  http.post("https://test-api.k6.io/public/crocodiles/1/", null, params);
  sleep(1);
}

// 包括的に 2 つの値の間のランダムな整数を得る
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
