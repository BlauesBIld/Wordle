<template>
    <h1>Guesser Game</h1>

    <button @click="() => (guess = 'red')">Guess Red</button>
    <button @click="() => (guess = 'black')">Guess Black</button>

    <h2>Current Guess: {{ guess }}</h2>

    <h2>Score: {{ score }}</h2>

    <div v-if="guess">
        <button @click="drawCard">Draw Card</button>

        <br />

        <div v-if="card">
            <img :src="card.image" alt="" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const deckId = ref('ng4opdq5tqs0');
const guess = ref();
const score = ref(0);
const card = ref();

async function drawCard() {
    const API = `https://www.deckofcardsapi.com/api/deck/${deckId.value}/draw/?count=1`;

    const data = await fetch(API).then((res) => res.json());

    card.value = data.cards[0];

    evaluateGuess();
}

function evaluateGuess() {
    // Figure out color of card
    const { suit } = card.value;
    // Check if guess matches the color

    const colormatch = {
        red: ['HEARTS', 'DIAMONDS'],
        black: ['SPADES', 'CLUBS'],
    };

    return colormatch[guess.value].includes(suit) ? score.value++ : false;
    // if match increment the score
}
</script>
