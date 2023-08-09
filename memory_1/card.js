// Group Members: 
// Jil: 8746405  Shefali: 8733421  Kunal: 8765938  Nandini: 8762146

let images = document.querySelectorAll("img");
var x = 0;
var matchedCard = 0;
var socre;
var numOfCards;
let srcs = ["images/card_1.png", "images/card_2.png", "images/card_3.png", "images/card_4.png", "images/card_5.png", "images/card_6.png", "images/card_7.png", "images/card_8.png", "images/card_9.png", "images/card_10.png", "images/card_11.png", "images/card_12.png", "images/card_13.png", "images/card_14.png", "images/card_15.png", "images/card_16.png", "images/card_17.png", "images/card_18.png", "images/card_19.png", "images/card_20.png", "images/card_21.png", "images/card_22.png", "images/card_23.png", "images/card_24.png",];

$(document).ready(function () {
  numOfCards = parseInt(sessionStorage.getItem("#num_cards")) || 48;

  //highest score
  if (localStorage.getItem("highScore")) {
    document.getElementById(
      "high_score").innerHTML = `High Score: ${localStorage.getItem("highScore")}`;
  }

  $("#tabs").tabs();
  shuffle();
  $("#save_settings").click(() => {
    //input vales
    const player_name = $("#player_name").val();
    const num_cards = $("#num_cards").val();
    // storing values 
    sessionStorage.setItem("#player_name", player_name);
    sessionStorage.setItem("#num_cards", num_cards);
    window.location.href = "./index.html";
  });
  let cards = document.querySelectorAll(".card_inner");
  let firstClick = false;
  let cardPair = [];
  cards.forEach((card) => { card.state = "unclicked"; });

  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", () => {
      if (!firstClick) {
        time();
      }
      firstClick = true;

      if (cards[i].state == "unclicked") {
        cards[i].style.transform = "rotateY(180deg)";
        cards[i].state = "clicked";
        cardPair.push(cards[i]);
        check();
      } else if (cards[i].state == "clicked") {
        cards[i].style.transform = "rotateY(0deg)";
        cards[i].state = "unclicked";
        cardPair = [];
      }
    });
  }

  // number of try 
  function check() {
    console.log(numOfCards);
    if (cardPair.length == 2) {
      x = x + 1;
      console.log(`x:${x}`);
      document.getElementById("try").innerHTML = `Number Of Try :  ${x}`;

      if (
        cardPair[0].querySelector("img").src ==
        cardPair[1].querySelector("img").src
      ) {
        matched();
      } else {
        unmatched(cardPair[0], cardPair[1]);
      }
    }
  }

  // correct pairs
  function matched() {
    cardPair[0].style.opacity = 0;
    cardPair[0].style.transform = "opacity 1s ;";
    cardPair[1].style.opacity = 0;
    cardPair[1].style.transform = "opacity 1s ";
    cardPair = [];

    matchedCard = matchedCard + 1;
    document.getElementById("correct").innerHTML = `Correct : ${matchedCard}`;
    console.log(`Num Of Cards : ${numOfCards}`);
    console.log(`Matched Cards : ${matchedCard}`);
    console.log(sessionStorage.getItem("#num_cards"));

    if (matchedCard === parseInt(sessionStorage.getItem("#num_cards")) / 2) {
      console.log(`x:${x}`);
      console.log(`nums of attempt:${x}`);
      console.log(`num of cards ${parseInt(sessionStorage.getItem("#num_cards")) / 2}`);
      var finalScore = ((parseInt(sessionStorage.getItem("#num_cards")) / 2) * 100) / x;

      // highest score in local storage
      if (localStorage.getItem("highScore")) {
        if (finalScore > parseInt(localStorage.getItem("highScore"))) {
          localStorage.setItem("highScore", finalScore.toFixed());
          document.getElementById(
            "high_score"
          ).innerHTML = `High Score : ${finalScore.toFixed()}%`;
        }
        // highest score 
        document.getElementById(
          "high_score"
        ).innerHTML = `Highest Score : ${localStorage.getItem("highScore")}%`;
      } else {
        localStorage.setItem("highScore", finalScore.toFixed());
        document.getElementById(
          "high_score"
        ).innerHTML = `High Score : ${finalScore.toFixed()}%`;

      }
    }
  }

  function unmatched(x, y) {
    setTimeout(() => {
      x.state = "unclicked";
      y.state = "unclicked";
      x.style.transform = "rotateY(0deg)";
      y.style.transform = "rotateY(0deg)";
    }, 750);
    cardPair[0].state = "blocked";
    cardPair[1].state = "blocked";
    cardPair = [];
  }

  function time() {
    let secs = 0;
    let mins = 0;
    let SS;
    let MM;
    setInterval(() => {
      secs++;
      if (secs == 60) {
        secs = 0;
        mins++;
      }
      secs < 10 ? (SS = `0${secs}`) : (SS = `${secs}`);
      mins < 10 ? (MM = `0${mins}`) : (SS = `${mins}`);
    }, 1000);
  }

  function shuffle() {
    let i, j;
    console.log(numOfCards);
    let imgArray = [
      ...srcs.slice(0, numOfCards / 2),
      ...srcs.slice(0, numOfCards / 2),
    ];

    // player name display
    if (sessionStorage.getItem("#player_name") != null) {
      document.getElementById("player").innerHTML =`Player Name :
        ${sessionStorage.getItem("#player_name")}`;

    } else {
      document.getElementById("player").innerHTML = "Player Name :";
    }

    while (numOfCards) {
      i = Math.floor(Math.random() * numOfCards--);
      j = imgArray[numOfCards];
      imgArray[numOfCards] = imgArray[i];
      imgArray[i] = j;
    }
    console.log(imgArray);
    setTimeout(displayCards(imgArray), 5000);
  }

  function displayCards(imgArray) {
    for (let x = imgArray.length - 1; x >= 0; x--) {
      document.getElementById("cards").innerHTML += ` <div class="card_outer">
      <div class="card_inner">
        <div class="front"></div>
        <div class="back"><img src="${imgArray[x]}" /></div>
      </div>
    </div>`;
    }
  }
});
