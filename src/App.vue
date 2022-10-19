<template>
  <router-view />
</template>

<script setup lang="ts">
useHead({
  title: 'Price calculator',
  meta: [
    {
      name: 'description',
      content: 'A recruitment task for IT company - form with dynamic validation, with sending to fake/mock server and congratulation screen',
    },
  ],
})
</script>

<style lang="scss">
@import "./assets/sass/main.scss";
</style>
