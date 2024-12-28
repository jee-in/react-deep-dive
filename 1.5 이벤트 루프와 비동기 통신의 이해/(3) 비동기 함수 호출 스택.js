function bar() {
  console.log('bar')
}

function baz() {
  console.log('baz')
}

function foo() {
  console.log('foo')
  setTimeout(bar, 0)
  baz()
}

foo()
