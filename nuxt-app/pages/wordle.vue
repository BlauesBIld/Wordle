<template>
    <div class="wordle-game">
        <div v-for="(guess, index) in guesses" :key="index" class="guess">
            <div
                v-for="(letter, position) in guess"
                :key="position"
                :class="{
          correctLetter: secretWordContainsLetterAtExactPosition(letter, position),
          containsLetter: secretWordContainsLetterNotOnExactPosition(letter, position),
          guessedLetter: true,
        }"
            >
                {{ checkLetter(letter, position) }}{{ letter.toUpperCase() }}
            </div>
        </div>
        <div class="guess-input">
            <input type="text" v-model="guess" maxlength="5" @keyup.enter="handleGuess"/>
            <button class="guessBtn" @click="handleGuess">Guess</button>
            <button class="resetBtn" @click="resetGame">Reset</button>
            <keyboard :used-letters="usedLetters" :correct-letters="correctLetters" :contains-letters="containsLetters" v-on:letter-selected="handleLetterSelected" />
        </div>
    </div>
</template>

<script>
import { possibleGuesses, possibleAnswers } from "~/pages/words";
import Keyboard from "~/components/Keyboard.vue";

export default {
    components: {
        Keyboard,
    },
    data() {
        return {
            secretWord: "",
            guesses: [],
            usedLetters: [],
            correctLetters: [],
            incorrectLetters: [],
            containsLetters: [],
            possibleAnswers: [],
            possibleGuesses: [],
        };
    },
    methods: {
        handleGuess() {
            if(this.isGameOver()){
                return;
            }

            this.guess = this.guess.toLowerCase();

            // Check if the guess is valid and is in the list of possible guesses
            if (this.guess.length !== 5 || !this.possibleGuesses.includes(this.guess)) {
                return;
            }

            // Check if the guess matches the secret word
            let correctPositions = 0;
            let correctLetters = 0;
            for (let i = 0; i < this.secretWord.length; i++) {
                if (this.guess[i] === this.secretWord[i]) {
                    correctPositions++;
                } else if (this.secretWord.includes(this.guess[i])) {
                    correctLetters++;
                }
            }

            // Add the guess to the previous guesses array
            this.guesses.push(this.guess);

            // Clear the current guess
            this.guess = "";

            // Update the score and check if the game is over
            this.updateScore();
            this.checkGameOver();
        },
        updateScore() {
            this.score = this.guesses.reduce((total, guess) => {
                let correctPositions = 0;
                let correctLetters = 0;
                for (let i = 0; i < this.secretWord.length; i++) {
                    if (guess[i] === this.secretWord[i]) {
                        correctPositions++;
                    } else if (this.secretWord.includes(guess[i])) {
                        correctLetters++;
                    }
                }
                return total + correctPositions + correctLetters;
            }, 0);
        },
        checkGameOver() {
            // Check if the game is over
            if (this.score === this.secretWord.length * this.guesses.length) {
                this.gameOver = true;
            }
        },
        checkLetter(letter, position) {
            console.log("Checking letter " + letter + " at position " + position);
            if (!this.usedLetters.includes(letter)) {
                console.log("Letter " + letter + " is not used yet and will be added to the used letters array");
                this.usedLetters.push(letter);
                console.log("Used letters array: " + this.usedLetters);
            }
            if (this.secretWord.includes(letter)) {
                if (this.secretWord[position] === letter) {
                    if (!this.correctLetters.includes(letter)) {
                        this.correctLetters.push(letter);
                    }
                } else {
                    if (!this.containsLetters.includes(letter)) {
                        this.containsLetters.push(letter);
                    }
                }
            } else {
                if (!this.incorrectLetters.includes(letter)) {
                    this.incorrectLetters.push(letter);
                }
            }
        },
        secretWordContainsLetterAtExactPosition(letter, position) {
            // Check if the letter is in the secret word
            if (this.secretWord.includes(letter)) {
                // Check if the letter is in the correct position
                if (this.secretWord[position] === letter) {
                    return true;
                }
            }

            return false;
        },
        secretWordContainsLetterNotOnExactPosition(letter, position) {
            // Check if the letter is in the secret word
            if (this.secretWord.includes(letter)) {
                // Check if the letter is in the correct position
                if (this.secretWord[position] !== letter) {
                    return true;
                }
            }

            return false;
        },
        handleLetterSelected(letter) {
            // Add the selected letter to the current guess
            this.guess += letter.toUpperCase();
        },
        isGameOver() {
            return this.guesses.includes(this.secretWord);
        },
        resetGame() {
            this.secretWord = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
            this.guesses = [];
            this.usedLetters = [];
            this.correctLetters = [];
            this.incorrectLetters = [];
            this.containsLetters = [];
            this.score = 0;
            this.gameOver = false;
            this.guess = "";
        },
    },
    mounted() {
        // Get a random word from the list of possible answers
        this.secretWord = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];

        // Get a list of possible guesses
        this.possibleGuesses = possibleGuesses;
        console.log(this.secretWord);
    },
};
</script>

<style>
.wordle-game {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.guess-input {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

input {
    width: 150px;
    height: 30px;
    border: black solid 1px;
    border-radius: 5px;
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
}

.guessedLetter {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: black solid 1px;
    border-radius: 15%;
    background-color: #f5f5f5;
    color: #333;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-right: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.correctLetter {
    background-color: #4caf50;
    color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.containsLetter {
    background-color: #ffeb3b;
    color: #333;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.guess {
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
}

.guessBtn,
.resetBtn {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.guessBtn:hover,
.resetBtn:hover {
    background-color: #3e8e41;
}

.resetBtn {
    background-color: #f44336;
}

.resetBtn:hover {
    background-color: #d32f2f;
}
</style>