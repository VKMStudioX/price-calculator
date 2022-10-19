<template>
  <div class="header">
      <h1 class="header__text"><span class="text-primary">{{ t('common.headerText1') }}</span> <span class="text-secondary">{{ t('common.headerText2') }}</span></h1>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>