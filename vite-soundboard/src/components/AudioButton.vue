<template>
    <audio
        :src="`/sounds/${sound}.wav`"
        controls
        ref="audioTag"
        @ended="ended"></audio>
    <button @click="playSound" :class="{ playing: isPlaying }">
        {{ sound }}
    </button>
</template>

<script setup>
import { ref } from 'vue';

const audioTag = ref();
const isPlaying = ref(false);
const props = defineProps(['sound']);

const playSound = () => {
    isPlaying.value = true;
    audioTag.value.play();
};

const ended = () => {
    isPlaying.value = false;
};
</script>
