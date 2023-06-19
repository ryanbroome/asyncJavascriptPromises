//
// ?=====================Writing a function that returns a promise, a promise machine rather than naming one one time, seems like a waste to just create one.======================
function wait3Seconds() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 3000);
    // * can do async stuff here
    // * then either resolve or reject by calling resolve or reject
    // * These are being called executed by the below, .then and .catch statements, this is just a promise.
    // resolve();
    // reject();
  });
}

wait3Seconds()
  .then(() => console.log('all done'))
  .catch(() => console.log('error'));
// ?====================================================================
console.log('Still Waiting');

const h1 = document.querySelector('h1');
// !====================Bad Nesting example of how to do without promises==================
// ! DEMO Example of how you would need to do this without promise chaining, becomes quite nested.
// setTimeout(function () {
//   h1.innerText = 'H';
//   h1.style.color = 'red';
//   setTimeout(() => {
//     h1.innerText = 'HE';
//     h1.style.color = 'orange';
//     setTimeout(() => {
//       h1.innerText = 'HEL';
//       h1.style.color = 'yellow';
//       setTimeout(() => {
//         h1.innerText = 'HELL';
//         h1.style.color = 'green';
//         setTimeout(() => {
//           h1.innerText = 'HELLO';
//           h1.style.color = 'blue';
//           setTimeout(() => {
//             h1.innerText = 'HELLO COLORS';
//             h1.style.color = 'violet';
//           }, 1000);
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// * THIS FUNCTION IS THE KEY TO BEING ABLE TO CHAIN PROMISES CHANGING COLORS BELOW BY RETURNING A PROMISE.
// ? THIS FUNCTION simply sets a 1 second timer then changes the color of the element provided then resolves the promise
// adorable little flat solution that's easy to read and can use one catch if the promise fails.
// !=====================================================================

// ?===================Example of using promises to change color sequentially=================
// * THIS FUNCTION IS THE KEY TO BEING ABLE TO CHAIN PROMISES CHANGING COLORS BELOW BY RETURNING A PROMISE.
// * THIS FUNCTION simply sets a 1 second timer then changes the color of the element provided then resolves the promise
//* adorable little flat solution that's easy to read and can use one catch if the promise fails.
function changeColor(el, color) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      el.style.color = color;
      resolve();
    }, 1000);
  });
}

changeColor(h1, 'red')
  .then(() => changeColor(h1, 'orange'))
  .then(() => changeColor(h1, 'yellow'))
  .then(() => changeColor(h1, 'green'))
  .then(() => changeColor(h1, 'blue'))
  .then(() => changeColor(h1, 'indigo'))
  .then(() => changeColor(h1, 'violet'));
// ?====================================================================
// *Better to make a function rather than a named variable, that way everytime it's called it creates a new Promise.
//  *Once promise is resolved, and is reused it's always resolved, no chance of reject. Making it a function will spit out a new promise each time that can be resolved or rejected
function mockAjaxRequest() {
  return new Promise(function (resolve, reject) {
    let probSuccess = 0.5;
    let requestTime = 1000;
    // We mock a netowrk request using a setTimeout.
    // The request takes requestTime milliseconds.
    // Afterwords, the promise is either resolved with data
    // or rejected with a timeout message
    // based on whether randomNum is less than probSuccess
    setTimeout(function () {
      let randomNum = Math.random();
      if (randomNum < probSuccess) {
        let data = 'heres your data';
        resolve(data);
      } else {
        reject('sorry your request failed');
      }
    }, requestTime);
  });
}
mockAjaxRequest()
  .then((data) => {
    console.log(data);
    return mockAjaxRequest();
  })
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// ?====================================================================

// ?====================================================================
