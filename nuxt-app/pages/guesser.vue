<template>
    <h2>Guesser Game</h2>

    <h3>Current Deck: {{ store.deckId }}</h3>

    <button @click="store.setGuess('red')">Guess Red</button>
    <button @click="store.setGuess('red')">Guess Black</button>

    <h3>Current Guess: {{ store.guess }}</h3>

    <h3>Score: {{ store.score }}</h3>

    <div v-if="store.guess">
        <button @click="store.drawCard">Draw Card</button>

        <br />

        <div v-if="store.card">
            <img :src="store.card.image" alt="" />
        </div>
    </div>
</template>

<script setup>
const store = useGuesserStore();
</script>
