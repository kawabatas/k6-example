/**
 * Prints a summary of test results with each tags.
 * https://k6.io/docs/using-k6/thresholds/#thresholds-on-tags
 * https://github.com/grafana/k6/issues/2030
 *
 * k6 run --iterations 3 examples/summary_with_tag.js
 */
import http from "k6/http";
import { sleep } from "k6";

export let options = {
  thresholds: {
    // 各タグごとのsummaryを出力する
    "http_req_duration{name:foo}": ["max>=0"],
    "http_req_duration{name:bar}": ["max>=0"],
  },
  summaryTrendStats: ["avg", "min", "med", "max", "p(95)", "p(99)", "count"],
};

export default function (data) {
  let p1 = {
    tags: {
      name: "foo",
    },
  };
  http.get("https://test.k6.io", p1);
  sleep(1);

  let p2 = {
    tags: {
      name: "bar",
    },
  };
  http.get("https://test.k6.io", p2);
  sleep(1);
}
