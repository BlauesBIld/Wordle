<template>
    <div class="keyboard">
        <div
                v-for="letter in letters"
                :key="letter"
                :class="{ correctLetter: correctLetters.includes(letter.toLowerCase()), containsLetter: containsLetters.includes(letter.toLowerCase()) && !correctLetters.includes(letter.toLowerCase()), usedLetter: usedLetters.includes(letter.toLowerCase()) }"
        >
            {{ letter }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        usedLetters: {
            type: Array,
            required: true,
        },
        correctLetters: {
            type: Array,
            required: true,
        },
        containsLetters: {
            type: Array,
            required: true,
        },
    },
    watch: {
        usedLetters(newVal) {
            console.log("new Val has been added: " + newVal);
        },
    },
    data() {
        return {
            letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        };
    }
};
</script>

<style>
.keyboard {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 10px;
}

.keyboard div {
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
    margin-bottom: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.keyboard div.usedLetter {
    background-color: grey;
}

.keyboard div.correctLetter {
    background-color: #4caf50;
}

.keyboard div.containsLetter {
    background-color: #ffeb3b;
}
</style>