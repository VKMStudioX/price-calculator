<template>
  <img
    v-if="success"
    class="validation__input--icon"
    src="@/assets/img/icons/form-validation-success.svg?url"
    alt="success"
  >
  <img
    v-if="error"
    class="validation__input--icon validation__input--icon-error"
    src="@/assets/img/icons/form-validation-error.svg?url"
    alt="error"
    @click="handleClearError"
  >
</template>

<script setup lang="ts">
interface Props {
  success: boolean
  error: boolean
  type?: string
}

const props = withDefaults(defineProps<Props>(), {
  success: false,
  error: false,
  type: 'index',
})

const { success, error, type } = toRefs(props)

const emit = defineEmits(['clearError', 'update:modelValue'])

const handleClearError = () => {
  emit('clearError', {
    type: type.value,
  })
}
</script>
