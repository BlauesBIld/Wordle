<template>
    <h1>Dog Details</h1>
    <NuxtLink to="/dogs">Go Back</NuxtLink>

    <div v-if="pending">Loading ...</div>
    <div v-else>
        <h1>{{ da.name }}</h1>
        <p>{{ da.description }}</p>
    </div>
</template>

<script setup>
// How to get the ID?
const route = useRoute();

const dogAPI = `https://dogapi.dog/api/v2/breeds/${route.params.dogid}`;

const { pending, data: details } = useFetch(dogAPI);

const da = computed(() => {
    if (details.value) return details.value.data.attributes;
});
</script>
