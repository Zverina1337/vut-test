<template>
  <div class="flex flex-col gap-1">
    <label
      v-if="label"
      :for="id"
      class="text-sm font-medium text-gray-700"
    >
      {{ label }}
      <span v-if="attrs.required" class="text-red-500" aria-label="обязательное поле">*</span>
    </label>
    <input
      v-model="value"
      v-bind="attrs"
      class="border border-gray-300 rounded-md px-3 py-1.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      :id
      :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': error?.flag }"
      :aria-invalid="error?.flag ? 'true' : 'false'"
      :aria-describedby="error?.flag ? errorId : undefined"
    >
    <span
      v-if="error?.flag"
      :id="errorId"
      class="text-red-500 text-xs mt-0.5"
      role="alert"
      aria-live="assertive"
    >
      {{ error.message }}
    </span>
  </div>
</template>

<script lang="ts" setup generic="T">
import { computed, useAttrs, type InputHTMLAttributes} from 'vue';

const attrs = useAttrs() as InputHTMLAttributes
interface Props<T> {
  modelValue: T;
  error?: { message: string; flag: boolean };
  id: string;
  label?: string;
}

interface Emits<T> {
  (e: 'update:modelValue', value: T): void
}

const props = defineProps<Props<T>>()
const emit = defineEmits<Emits<T>>()

const value = computed({
  get: () => props.modelValue,
  set: (val: T) => emit('update:modelValue', val)
})
const errorId = computed(() => `${props.id}-error`);
</script>
