import { defineStore } from 'pinia';

export const useGuesserStore = defineStore('guesser', () => {
    const score = ref(0);

    const deckId = ref();

    onMounted(async () => {
        const { deck_id } = await $fetch(
            'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
        );
        deckId.value = deck_id;
    });

    const guess = ref();
    const card = ref();

    function setGuess(color) {
        guess.value = color;
    }

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

    return {
        score,
        deckId,
        guess,
        card,
        drawCard,
        setGuess,
    };
});
