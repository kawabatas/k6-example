/**
 * First, a simple script.
 * k6 run 0.js
 */
import http from "k6/http";
import { sleep } from "k6";

export default function () {
  http.get("https://test.k6.io");
  sleep(1);
}
