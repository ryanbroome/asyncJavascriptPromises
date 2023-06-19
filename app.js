const $mainUL = $('.multi');
const $cardTitle = $('.card-title');
const $cardSubtitle = $('.card-subtitle');
const $cardText = $('.card-text');
const $cardLink = $('.card-link');
const $singleUL = $('.single');

const BASE_URL = 'http://numbersapi.com';
const MULTI_URL = `${BASE_URL}/1..3,10`;

let types = ['trivia', 'year', 'date', 'math'];
let number = randomNumber();
let type = types[randomTypeIndex()];
let fullURL = URLgenerator(number, type);

// Super clean super neat super FLAT axios request, does not need to be named
// Chaining promises using axios.get(URL).then(callbackFunction(){return another promise}).then(=>{}).catch(callback(){})
// One catch for when a promise is explicitly rejected

//?===========MULTI REQUEST, promise chain
// TODO maybe add a when done timer to show that it's loading
axios
  .get(fullURL)
  .then((result) => {
    $mainUL.append(`<li class="ADD_BOOTSTRAP">${result.data}</li>`);
    console.log('First Promise', result);
    return axios.get(randURL());
  })
  .then((result) => {
    $mainUL.append(`<li class="ADD_BOOTSTRAP">${result.data}</li>`);
    console.log('Second Promise', result);
    return axios.get(randURL());
  })
  .then((result) => {
    $mainUL.append(`<li class="ADD_BOOTSTRAP">${result.data}</li>`);
    console.log('Third Promise', result);
    return axios.get(randURL());
  })
  .then((result) => {
    $mainUL.append(`<li class="ADD_BOOTSTRAP">${result.data}</li>`);
    console.log('Fourth Promise', result);
    return axios.get(randURL());
  })
  .catch((err) => {
    $mainUL.append(`<li class="ADD_BOOTSTRAP">${err}</li>`);
    console.log(err, 'err');
    // return axios.get(fullURL);
  });

//?============SINGLE REQUEST, single promise making bootstrap card
// TODO should make an err print on page perhaps so user sees error why
axios
  .get(fullURL)
  .then((result) => {
    $cardTitle.append(`Type: ${type}`);
    $cardSubtitle.append(`Number: ${number}`);
    $cardText.append(`Text: ${result.data}`);
    fullURL = URLgenerator(number, type);
    console.log('Fifth Promise, SINGLE REQUEST BS Card', result);
  })
  .catch((err) => {
    $cardTitle.append(`Error: ${err}`);
    console.log(err, 'err');
  });

//? =============SINGLE promise REQUEST MULTI NUMBERS
axios
  .get(MULTI_URL)
  .then((result) => {
    for (each in result.data) {
      $singleUL.append(`<li class="single">${result.data[each]}</li>`);
    }
    console.log('Sixth Promise, SINGLE PROMISE, multi number request', result);
  })
  .catch((err) => {
    $singleUL.append(`<li>${err}</li>`);
    console.log(err, 'err');
    // return axios.get(fullURL);
  });

// *================HELPER FUNCTIONS=========================

//? helper functions
function randomNumber() {
  return Math.round(Math.random() * 10 * (Math.random() * 10)) * Math.round(Math.random() * 100);
}
function randomTypeIndex() {
  return Math.round(Math.random() * (types.length - 1));
}
//? helper URL functions
function URLgenerator(number, type) {
  return `${BASE_URL}/${number}/${type}`;
}
function randURL() {
  return URLgenerator(randomNumber(), types[randomTypeIndex()]);
}
