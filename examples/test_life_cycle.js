/**
 * Script to check the test life cycle.
 * https://k6.io/docs/using-k6/test-life-cycle/
 * https://k6.io/docs/results-visualization/end-of-test-summary/#handlesummary-callback
 *
 * k6 run --vus 3 --duration 5s examples/test_life_cycle.js
 */
import { sleep } from "k6";

// "init code" is run only once per VU.
console.log("--- init code ---");

// setup and teardown are only called once for a test.
export function setup() {
  console.log("--- setup code ---");
}

export default function (data) {
  // https://github.com/grafana/k6/issues/784#issuecomment-425369657
  if (__ITER == 0) {
    console.log("--- VU(default) code --- only once ---");
  }
  console.log("--- VU(default) code ---");
  sleep(1);
}

export function teardown(data) {
  console.log("--- teardown code ---");
}

export function handleSummary(data) {
  console.log("--- handleSummary ---");
  return {
    stdout: JSON.stringify(data),
  };
}
