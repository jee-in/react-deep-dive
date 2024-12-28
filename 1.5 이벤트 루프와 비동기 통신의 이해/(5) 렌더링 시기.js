const sync = document.getElementById('sync')
const macrotask = document.getElementById('macrotask')
const microtask = document.getElementById('microtask')

const macro_micro = document.getElementById('macro_micro')

// 동기 코드로 버튼에 1부터 렌더링
sync.addEventListener('click', function () {
  for (let i = 0; i <= 100000; i++) {
    sync.innerHTML = i
  }
})

// setTimeout으로 태스크 큐에 작업을 넣어서 1부터 렌더링
macrotask.addEventListener('click', function () {
  for (let i = 0; i <= 100000; i++) {
    setTimeout(() => {
      macrotask.innerHTML = i
    }, 0)
  }
})

// queueMicrotask로 마이크로 태스크 큐에 넣어서 1부터 렌더링
microtask.addEventListener('click', function () {
  for (let i = 0; i <= 100000; i++) {
    queueMicrotask(() => {
      microtask.innerHTML = i
    })
  }
})

macro_micro.addEventListener('click', function () {
  for (let i = 0; i <= 100000; i++) {
    sync.innerHTML = i
    
    setTimeout(() => {
      macrotask.innerHTML = i
    }, 0)

    queueMicrotask(() => {
      microtask.innerHTML = i
    })
  }
})
