<template>
    <div class="congratulations" id="congratulations">
        <h2 id="congratulationsContent1">{{ t('congratulations.header') }}</h2>
        <h3 id="congratulationsContent2">{{ t('congratulations.content1') }}</h3>
        <h3 id="congratulationsContent3">{{ t('congratulations.content2') }} <span @click="handleRefresh" class="cursor-pointer text-decoration-underline">{{ t('congratulations.content-link') }}</span> {{ t('congratulations.content3') }}</h3>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const emit = defineEmits(['refresh'])
const handleRefresh = () => emit('refresh', true)
</script>
