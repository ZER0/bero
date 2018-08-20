const test = require("tape");
const bem = require("../");

test("bem() returns itself", assert => {
  assert.equal(bem(), bem, "calling bem without arguments returns itself");
  assert.end();
});

test("bem(block, elem, Object) full signature call", assert => {
  const classname = bem("block", "elem", {
    fooBar: true,
    baz: 1,
    qux: undefined
  });

  assert.equal(
    classname,
    "block__elem block__elem--foo-bar block__elem--baz",
    "calling bem with full signature returns the expected string"
  );

  assert.end();
});

test("bem(block, elem, Array) full signature call", assert => {
  const classname = bem("block", "elem", ["fooBar", "baz", undefined]);

  assert.equal(
    classname,
    "block__elem block__elem--foo-bar block__elem--baz",
    "calling bem with full signature returns the expected string"
  );

  assert.end();
});

test("bem(block) only block given", assert => {
  const block = bem("block");

  assert.equal(
    typeof block,
    "function",
    "calling bem with just the block given, returns a function"
  );

  assert.equal(
    block(),
    "block",
    "calling the block function without args returns the expected classname"
  );

  assert.end();
});

test("bem(block)(elem) returns the expected classname", assert => {
  const block = bem("block");

  assert.equal(block("elem"), "block__elem");

  assert.end();
});

test("bem(block)(Object) returns the expected classname", assert => {
  const block = bem("block");

  assert.equal(
    block({ foo: true, bar: false, bazQux: 1 }),
    "block block--foo block--baz-qux"
  );

  assert.end();
});

test("bem(block)(Array) returns the expected classname", assert => {
  const block = bem("block");

  assert.equal(
    block(["foo", undefined, "bazQux"]),
    "block block--foo block--baz-qux"
  );

  assert.end();
});

test("bem(block)(elem, Object) returns the expected classname", assert => {
  const block = bem("block");

  assert.equal(
    block("elem", { foo: true, bazQux: true, bar: 1 }),
    "block__elem block__elem--foo block__elem--baz-qux block__elem--bar"
  );

  assert.end();
});

test("bem(block)(elem, Array) returns the expected classname", assert => {
  const block = bem("block");

  assert.equal(
    block("elem", ["foo", undefined, "bazQux", "bar"]),
    "block__elem block__elem--foo block__elem--baz-qux block__elem--bar"
  );

  assert.end();
});

test("bem(block + elem) returns an element function", assert => {
  const elem = bem("block__elem");

  assert.equal(
    typeof elem,
    "function",
    "calling bem with element as first arg returns a function"
  );

  assert.equal(
    elem(),
    "block__elem",
    "calling the element function returns the full expected classname"
  );

  assert.end();
});

test.skip("bem(block + elem) can't be called with an additional identifier", assert => {
  const elem = bem("block__elem");

  assert.throws(() => elem("what"));

  assert.end();
});

test("bem(block + elem, Object) returns the expected classname", assert => {
  const elem = bem("block__elem");

  assert.equal(
    elem({ foo: true, bazQux: true, bar: 1 }),
    "block__elem block__elem--foo block__elem--baz-qux block__elem--bar"
  );

  assert.end();
});

test("bem(block, elem) returns an element function", assert => {
  const elem = bem("block", "elem");

  assert.equal(
    typeof elem,
    "function",
    "calling bem with element as first arg returns a function"
  );

  assert.equal(
    elem(),
    "block__elem",
    "calling the element function returns the full expected classname"
  );

  assert.end();
});

test.skip("bem(block, elem) can't be called with an additional identifier", assert => {
  const elem = bem("block", "elem");

  assert.throws(() => elem("what"));

  assert.end();
});

test("bem(block, elem, Object) returns the expected classname", assert => {
  const elem = bem("block", "elem");

  assert.equal(
    elem({ foo: true, bazQux: true, bar: 1 }),
    "block__elem block__elem--foo block__elem--baz-qux block__elem--bar"
  );

  assert.end();
});

test("bem.join(...args)", assert => {
  assert.equal(
    bem.join("foo", false, "bar", undefined, "", "baz"),
    "foo bar baz"
  );

  assert.end();
});
