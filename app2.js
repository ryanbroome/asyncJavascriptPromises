// PART TWO - Beginning of a card game, first two cards followed up by adding 1-5 cards with range button
let USER_CARD_COUNT = document.querySelector('#card_count');

// variable - used in request url string
let DECK_COUNT = 1;
// variable - used in request url string
let CARD_COUNT = 2;
// variable
let count = 0;
// session variable

// variable URL
let NEW_DECK_URL = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${DECK_COUNT}`;
// promise returns new deck
let NEW_DECK = axios.get(NEW_DECK_URL);
// variable - DOM element selector so i can append to the body
let body = document.querySelector('body');
// variable deck id
let CURRENT_DECK_ID;
console.log('CURRENT_DECK_ID', CURRENT_DECK_ID);

// promise chain
NEW_DECK.then((result) => {
  // result data is passed in print data from request for a new shuffled deck
  console.log('1st promise resolved result, shuffled deck', result.data);
  CURRENT_DECK_ID = result.data.deck_id;
  // return a promise for a draw card from same deck
  return axios.get(`https://deckofcardsapi.com/api/deck/${result.data.deck_id}/draw/?count=${CARD_COUNT}`);
})
  .then((result) => {
    // result data from draw a card request passed in,  print  data from request card
    console.log('2nd promise resolved result, give me a card', result.data);

    // loop over each card object in the cards array
    for (cardObj of result.data.cards) {
      // keep count of how many cards are drawn and made
      count += 1;
      // create an image element for each card object
      $hand.append(HTMLmarkup(cardObj));
      // print each drawn cardObj info to console
      console.log(`Your card is a ${cardObj.value} of ${cardObj.suit}`);
    }
  })
  .catch((err) => {
    console.log(err, 'err');
  });
// ! END FIRST SET OF CARDS ON LOAD

// ? START BUTTON

// variable button selector using jquery
const button = $('#newCard');
// Hand container to hold cards
const $hand = $('#hand');
// part two container to hold part two features
const $partTwo = $('#part-two');
// event listener for button, when click do the func stuff
button.on('click', function (evt) {
  evt.preventDefault();

  CARD_COUNT = USER_CARD_COUNT.value;
  // make request  using DECK_ID FROM INITIAL REQUEST to pull from same deck
  axios
    .get(`https://deckofcardsapi.com/api/deck/${CURRENT_DECK_ID}/draw/?count=${CARD_COUNT}`)
    .then((result) => {
      console.log('button 2nd request', result.data);
      // take the result and loop over the array of card objects extracting the image from each and appending to page
      for (cardObj of result.data.cards) {
        count += 1;
        $hand.append(HTMLmarkup(cardObj));
        console.log(`Your card is a ${cardObj.value} of ${cardObj.suit}`);
      }
    })
    .catch((err) => {
      console.log(err, 'err');
    });
});

// helper to write markup, reusable for making card objects on screen
function HTMLmarkup(cardObj) {
  return `<div class="card" style="width: 10rem;">
      <img src="${cardObj.image}" class="card-img-top" alt="card did not load">
      <div class="card-body">
        <h5 class="card-title">${cardObj.value} of ${cardObj.suit}</h5>
        <p class="card-text">Your card is a ${cardObj.code}</p>
      </div>`;
}
