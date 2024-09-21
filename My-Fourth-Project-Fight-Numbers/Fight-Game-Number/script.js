'use strict';


const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceElHidden = document.querySelector('.dice');
const btnNew= document.querySelector('.btn--new');
const btnRoll= document.querySelector('.btn--roll');
const btnHold= document.querySelector('.btn--hold');
const player0=document.querySelector('.player--0');
const player1 =document.querySelector('.player--1');
const currentScore0 =document.querySelector('#current--0');
const currentScore1 =document.querySelector('#current--1');

let scores,currentScore,activePlayer,playing;

const init = function(){
scores = [0, 0];
currentScore = 0;
activePlayer  = 0;
playing = true;
    
score0El.textContent = 0;
score1El.textContent = 0;
currentScore0.textContent= 0;
currentScore1.textContent= 0;
player0.classList.remove('player--winner');
player1.classList.remove('player--winner');
player0.classList.add('player--active');
player1.classList.remove('player--active');
document.querySelector(`#name--${activePlayer}`).textContent = 'Player 1';

}
init();

const switchPlayer = function(){
    document.querySelector(`#current--${activePlayer}`).textContent=0;
        currentScore = 0;
        activePlayer = activePlayer===0 ? 1 : 0;
        player0.classList.toggle('player--active');
        player1.classList.toggle('player--active');
};


//Strarting Condition
score0El.textContent = 0;
score1El.textContent = 0;
diceElHidden.classList.add ('hidden');

//Rolling dice funcitonality

btnRoll.addEventListener('click', function(){
    //1.Generation a random dice roll
if(playing){
 const dice= Math.trunc(Math.random() * 6) + 1;


    //2.Dispaly dice
    diceElHidden.classList.remove('hidden');
    diceElHidden.src = `dice-${dice}.png`;


    //3.Check for rolled 1 ( if true, swtich to enxt player)
    if(dice !== 1) {
        document.querySelector(`#current--${activePlayer}`).textContent=currentScore;
        currentScore = currentScore + dice;
        
        
    }else{
        switchPlayer();
    };

    
}
   
});

btnHold.addEventListener('click', function(){
    

    if(playing){
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent=scores[activePlayer];

  if(scores[activePlayer] >= 100){
    playing=false;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    document.querySelector(`#name--${activePlayer}`).textContent = 'You Win';
    diceElHidden.classList.add('hidden')
  }else{
    switchPlayer();
  }

    }
  
 

});


btnNew.addEventListener('click', init);
