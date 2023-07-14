<template>
    <h1>Soundboard</h1>

    <AudioButton v-for="sound in sounds" :sound="sound" />
</template>

<script setup>
import AudioButton from './components/AudioButton.vue';

const sounds = ['clap', 'hihat', 'kick', 'perc', 'snare', 'tom'];
</script>
