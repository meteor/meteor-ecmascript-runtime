var assert = require("assert");

function runTests(collections) {
  it("Map is defined", function () {
    assert.strictEqual(typeof collections.Map, "function");
  });

  it("Map basically works", function () {
    var map = new collections.Map;
    var key = {};
    map.set(key, 1234);
    assert.deepEqual(map.entries().next(), {
      value: [key, 1234],
      done: false
    });
  });

  it("Set is defined", function () {
    assert.strictEqual(typeof collections.Set, "function");
  });

  it("Set basically works", function () {
    var set = new collections.Set;
    var key = {};
    set.add(key);
    assert.deepEqual(set.values().next(), {
      value: key,
      done: false
    });
  });

  it("Array methods", function () {
    assert.deepEqual(Array.from("123", Number), [1, 2, 3]);
    assert.deepEqual(Array.of(1, 3, 5), [1, 3, 5]);
    assert.deepEqual(
      Array(5).fill("oyez"),
      ["oyez", "oyez", "oyez", "oyez", "oyez"]
    );

    function isOdd(n) {
      return n % 2;
    }

    assert.strictEqual([2, 3, 4].find(isOdd), 3);
    assert.strictEqual([2, 3, 4].findIndex(isOdd), 1);
  });
}

describe("ecmascript-collections", function () {
  runTests(require(".."));
});

describe("server.js", function () {
  runTests(require("../server.js"));
});

describe("client.js", function () {
  global.window = global;
  require("../client.js");
  delete global.window;

  runTests({
    Map: global.Map,
    Set: global.Set
  });
});
