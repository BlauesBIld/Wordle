<template>
    <audio :src="`/sounds/${sound}.wav`" ref="audioTag" @ended="ended"></audio>
    <button @click="playSound" :class="{ playing: isPlaying }" class="mx-2">
        {{ sound }}
    </button>
</template>

<script setup>
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

<style>
button.playing {
    @apply bg-green-300;
}
</style>
