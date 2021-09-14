/**
 * Prints a summary of test results with each groups.
 * https://k6.io/docs/using-k6/thresholds/#threshold-on-group-duration
 *
 * k6 run --iterations 3 examples/summary_with_group.js
 */
import http from "k6/http";
import { sleep, group } from "k6";

export let options = {
  thresholds: {
    // 各タグごとのsummaryを出力する
    "http_req_duration{group:::individualRequests}": ["max>=0"],
    "http_req_duration{group:::batchRequests}": ["max>=0"],
  },
  summaryTrendStats: ["avg", "min", "med", "max", "p(95)", "p(99)", "count"],
};

export default function () {
  group("individualRequests", function () {
    http.get("https://test-api.k6.io/public/crocodiles/1/");
    http.get("https://test-api.k6.io/public/crocodiles/2/");
    http.get("https://test-api.k6.io/public/crocodiles/3/");
  });

  group("batchRequests", function () {
    http.batch([
      ["GET", `https://test-api.k6.io/public/crocodiles/1/`],
      ["GET", `https://test-api.k6.io/public/crocodiles/2/`],
      ["GET", `https://test-api.k6.io/public/crocodiles/3/`],
    ]);
  });
  sleep(1);
}
