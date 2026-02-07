<template>
  <div class="flex flex-col">
    <label 
      v-if="label" 
      :for="id"
    >
      {{ label }}
      <span v-if="attrs.required" aria-label="обязательное поле">*</span>
    </label>
    <input 
      v-model="value"
      v-bind="attrs"
      class="border"
      :id 
      :class="{ 'border-red-500': error?.flag }"
      :aria-invalid="error?.flag ? 'true' : 'false'"
      :aria-describedby="error?.flag ? errorId : undefined"
    >
    <span
      v-if="error?.flag"
      :id="errorId"
      class="text-red-500 text-sm"
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
