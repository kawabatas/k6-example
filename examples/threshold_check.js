/**
 * It can often be useful to combine checks and thresholds.
 * https://k6.io/docs/using-k6/thresholds/#failing-a-load-test-using-checks
 *
 * k6 run examples/threshold_check.js
 */
import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  thresholds: {
    // 90% of requests must finish within 500ms, 95% within 800ms.
    http_req_duration: ["p(90)<500", "p(95)<800"],
    // the rate of successful checks should be higher than 95%.
    checks: ["rate>0.95"],
  },
};

export default function () {
  let res = http.get("https://test.k6.io");
  check(res, {
    "is status OK": (r) => r.status === 200,
  });
  sleep(1);
}
