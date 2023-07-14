<template>
    <h1>All about dogs</h1>

    <DogList :dogs="breeds" />
</template>

<script setup>
const dogsAPI = `https://dogapi.dog/api/v2/breeds`;

const { data: result } = useFetch(dogsAPI);

const breeds = computed(() => {
    if (result.value) return result.value.data;

    return [];
});
</script>
