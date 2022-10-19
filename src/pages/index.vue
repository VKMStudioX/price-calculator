<template>
<section>
  <div class="container" :class="{ 'container--success' : success }">
    <h2 class="margin-bottom-2" v-if="!success">{{ t('common.form') }}</h2>
  <Form v-if="!success" @success="handleSuccess($event)"/>
  <Congratulations v-else @refresh="handleRefresh($event)" />
  </div>
</section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const success = ref(false)

const handleSuccess = (value) => {
  success.value = value
}

const handleRefresh = (value) => {
  success.value = false
}

</script>

<route>
{
  path: "/",
  name: "home",
  meta: {
    layout: 'default'
  }
}
</route>
