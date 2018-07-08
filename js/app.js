/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];
let flippedCard = [];
let moves = 0;
let checkCompleted = 0;
let rateStar = '5';
let timer = 0;

// 1. Shuffle Card //Going to Shuffle 2 times for better shuffing.
shuffle(cards);
// 2. Set Cards on the deck
setCardsOnDeck();
// 3. Start the game
startGame();
// 4. Get timer going on
getTimerRunning();
// 5. Restart Game when Necessary
restartGame();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided 'shuffle' method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function setCardsOnDeck() {
    let cardList = shuffle(cards);
    $('.card').remove();
    cardList.forEach(function(card) {
        $('.deck').append('<li><i class="card fa ' + card + '"></i></li>');
    })
}

// Shuffle cards (function from http://stackoverflow.com/a/2450976)
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of 'open' cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function startGame() {

    $('.card').addClass('open show');

    setTimeout(function() {
      $('.card').removeClass('open show');
    }, 3000);

    $('.card').on('click', function() {
      // Flipping 2 Cards = [0],[1]
        if (flippedCard.length > 1) {
            return;
        }

        if ($(this).hasClass('open show')) {
            return;
        }

        $(this).toggleClass('open show');
        flippedCard.push($(this));
        if (flippedCard.length === 2) {
            if (flippedCard[0][0].classList[2] === flippedCard[1][0].classList[2]) {
                matched();
            } else {
                unmatched();
            }
        }
        updateMoves();
    });
}

function matched() {
  flippedCard[0][0].classList.add('match');
  flippedCard[1][0].classList.add('match');
  $(flippedCard[0]).off('click');
  $(flippedCard[1]).off('click');
  //CompletedCheck & Move update
  checkCompleted += 1;
  moves++;
  refreshOpenedCards();
  winner();
}

function unmatched() {
  setTimeout(removeClasses, 900);
  setTimeout(refreshOpenedCards, 900);
  moves++;
}

function refreshOpenedCards() {
    flippedCard = [];
}

function removeClasses() {
    $('.card').removeClass('show open');
    refreshOpenedCards();
}

function updateMoves() {
    let movement = document.querySelectorAll('.moves');

    for( let move of movement) {
        move.innerText += 1;
    }
    $('.moves').text(moves.toString());

    if (moves > 0 && moves < 11) {
        rateStar = '5';
    } else if (moves >= 11 && moves <= 15) {
        $('#starOne').removeClass('fa-star');
        rateStar = '4';
    } else if (moves >= 16 && moves <= 20) {
        $('#starTwo').removeClass('fa-star');
        rateStar = '3';
    } else if (moves >= 21 && moves <= 26) {
        $('#starThree').removeClass('fa-star');
        rateStar = '2';
    } else if (moves > 26){
        $('#starFour').removeClass('fa-star');
        rateStar = '1'
    }
}



function winner() {
    if (checkCompleted === 8) {
        let modal = document.getElementById('newModal');
        let span = document.getElementsByClassName('close')[0];

        //Modal Moves and Stars input
        $('#total-moves').text(moves);
        $('#total-stars').text(rateStar);
        //Now Enable Displays Modal
        modal.style.display = 'block';

        span.onclick = function() {
            modal.style.display = 'none';
        }
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = 'none';
            }
        }

        $('.playButton').on('click', function() {
            modal.style.display = 'none';
            restartGame();
        });

        clearInterval(timer);
    }
}

function getTimerRunning() {
    let startClick = 0;
    $('.card').on('click', function() {
        startClick += 1;
        if (startClick === 1) {
          //get timer go on
            var sec = 0;
            function time(val) {
                return val > 9 ? val : '0' + val;
            }
            timer = setInterval(function() {
                $('.seconds').html(time(++sec % 60));
                $('.minutes').html(time(parseInt(sec / 60, 10)));
            }, 1000);
        }
    });
}

function restartGame() {
    let restart = $('.restart').on('click', function() {
        //location reload function from w3schools.com
        location.reload()
    });
    return restart;
}
