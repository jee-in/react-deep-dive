console.log('a')

setTimeout(() => {
  console.log('b')
}, 0)

Promise.resolve().then(() => {
  console.log('c')
})

window.requestAnimationFrame(() => {
  console.log('d')
})

// console.log('Start');
// document.body.style.backgroundColor = 'red';

// requestAnimationFrame(() => {
//   for (let i = 0; i < 1e9; i++) {} // 연산
//   console.log('End');
// });
