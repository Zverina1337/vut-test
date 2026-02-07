<template>
  <form class="flex items-end gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
    <BaseInput
      :model-value="tagsString"
      label="Метка"
      :error="errors.tags"
      :id="`tag-${account.id}`"
      type="text"
      @update:model-value="onTagsInput"
      @blur="onTagsBlur"
    />
    <BaseSelect
      :model-value="account.type"
      :options="typeOptions"
      :id="`account-type-${account.id}`"
      label="Тип записи"
      @update:model-value="onTypeChange"
    />
    <BaseInput
      :model-value="account.login"
      label="Логин"
      :error="errors.login"
      :id="`login-${account.id}`"
      type="text"
      required
      @update:model-value="onLoginInput"
      @blur="onLoginBlur"
    />
    <BaseInput
      v-if="account.type === 'Локальная'"
      :model-value="account.password ?? ''"
      label="Пароль"
      :error="errors.password"
      :id="`password-${account.id}`"
      type="password"
      required
      @update:model-value="onPasswordInput"
      @blur="onPasswordBlur"
    />
    <BaseButton
      type="button"
      variant="danger"
      @click="store.deleteAccount(account.id)"
    >
      &times;
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import type { Account, type } from '@/types/account'
import type { Error } from '@/types/types'
import BaseButton from '../BaseButton.vue'
import BaseInput from '../BaseInput.vue'
import BaseSelect from '../BaseSelect.vue'
import { validateLogin, validatePassword, validateTags } from '@/utils/validation'
import { stringToTags, tagsToString } from '@/utils/parseTags'
import { useAccountStore } from '@/stores/account'

interface Errors {
  tags?: Error
  login?: Error
  password?: Error
}

const props = defineProps<{
  account: Account
}>()

const store = useAccountStore()

const typeOptions = [
  { value: 'Локальная', label: 'Локальная' },
  { value: 'LDAP', label: 'LDAP' },
]

const errors = reactive<Errors>({})

const tagsString = computed(() => {
  return props.account.tags ? tagsToString(props.account.tags) : ''
})


function onTagsInput(value: string) {
  store.updateAccount(props.account.id, {
    tags: stringToTags(value),
  })
}

function onTagsBlur() {
  errors.tags = validateTags(tagsString.value)
}

function onLoginInput(value: string) {
  store.updateAccount(props.account.id, { login: value })
}

function onLoginBlur() {
  const result = validateLogin(props.account.login)
  errors.login = result
  if (!result.flag) {
    store.updateAccount(props.account.id, { login: props.account.login })
  }
}

function onPasswordInput(value: string) {
  store.updateAccount(props.account.id, { password: value })
}

function onPasswordBlur() {
  const result = validatePassword(props.account.password)
  errors.password = result
  if (!result.flag) {
    store.updateAccount(props.account.id, { password: props.account.password })
  }
}

function onTypeChange(value: string) {
  const type = value as type
  if (type === 'LDAP') {
    store.updateAccount(props.account.id, { type, password: null })
    errors.password = undefined
  } else {
    store.updateAccount(props.account.id, { type, password: '' })
  }
}

watch(
  () => props.account.type,
  (type) => {
    if (type === 'LDAP') {
      errors.password = undefined
    }
  },
)
</script>
