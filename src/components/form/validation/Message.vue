<template>
  <div :id="id" class="validation">
    <img
      class="validation__message--icon"
      src="@/assets/img/icons/form-validation-warning.svg?url"
      alt="error"
    >
    <span class="validation__message--text">
      <slot>{{ t('validations.name') }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {})
const { id } = toRefs(props)
const { t } = useI18n()
</script>
