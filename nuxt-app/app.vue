<template>
    <div class="p-4 bg-slate-100 rounded border-slate-200 border">
        <h1 class="text-purple-400 mb-4">☀️ SS23 Nuxt App</h1>
        <nav role="main">
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="/hello">Hello</NuxtLink>
            <NuxtLink to="/soundboard">Soundboard</NuxtLink>
            <NuxtLink to="/guesser">Play Guesser</NuxtLink>
            <NuxtLink to="/dogs">All about dogs</NuxtLink>
            <NuxtLink to="/wordle">Play Wordle</NuxtLink>
        </nav>
        <div class="py-4">
            <NuxtPage />
        </div>
    </div>
</template>

<script setup>
const store = useGuesserStore();
</script>

<style>
nav[role='main'] > a {
    @apply mr-4 p-2;
}

nav[role='main'] > a.router-link-active {
    @apply text-slate-400;
}
</style>
