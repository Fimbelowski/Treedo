<script setup lang="ts">
interface Props {
  id: string;
  label: string;
  modelValue: string;
  placeholder: string;
  required?: boolean;
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void,
}>();

withDefaults(defineProps<Props>(), {
  required: false,
});

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <label
    class="base-text-input__label"
    :for="id"
  >
    {{ label }}
  </label>
  <input
    :id="id"
    class="base-text-input__input"
    type="text"
    :value="modelValue"
    v-bind="$attrs"
    @input="handleInput"
  >
</template>

<style lang="scss">
.base-text-input {
  &__label {
    padding-right: 1.5rem;
  }
}
</style>
