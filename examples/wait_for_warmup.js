/**
 * Execute the warm-up request for seconds, then do main request.
 *
 * k6 run --duration 10s examples/wait_for_warmup.js
 */
import { sleep } from "k6";

const WARMUP_TIME_SECOND = 5;
const startTime = Date.now();

export default function () {
  let isWarmup = (Date.now() - startTime) / 1000 <= WARMUP_TIME_SECOND;

  if (isWarmup) {
    console.log("--- warm-up request ---");
  } else {
    console.log("--- main request ---");
  }
  sleep(1);
}
