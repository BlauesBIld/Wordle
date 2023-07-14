<template>
    <h2>Soundboard</h2>

    <AudioButton v-for="sound in sounds" :sound="sound" />
</template>

<script setup>
const sounds = ['clap', 'hihat', 'kick', 'perc', 'snare', 'tom'];
</script>
