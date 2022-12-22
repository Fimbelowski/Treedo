<script setup lang="ts">
interface Props {
  disabled?: boolean;
  id: string;
  label?: string;
  modelValue: boolean;
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  label: undefined,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void,
}>();

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
}
</script>

<template>
  <input
    :id="id"
    :disabled="disabled"
    type="checkbox"
    @input="handleInput"
  >
  <label
    v-if="label !== undefined"
    :for="id"
  >
    {{ label }}
  </label>
</template>
