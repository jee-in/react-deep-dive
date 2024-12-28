function foo() {
  console.log('foo')
}

function bar() {
  console.log('bar')
}

function baz() {
  console.log('baz')
}

setTimeout(foo, 0)

Promise.resolve().then(bar).then(baz)

