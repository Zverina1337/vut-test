<script setup lang="ts">
import { useAccountStore } from '@/stores/account'
import AccountForm from './components/forms/AccountForm.vue';
import BaseButton from './components/BaseButton.vue';

const store = useAccountStore()
</script>

<template>
  <main class="min-h-screen bg-gray-100 py-10 px-4">
    <section class="max-w-4xl mx-auto flex flex-col gap-5">
      <div class="flex items-center gap-3">
        <h2 class="text-2xl font-semibold text-gray-800">Учетные записи</h2>
        <BaseButton
          variant="primary"
          @click="store.addAccount()"
        >
          +
        </BaseButton>
      </div>
      <p class="text-sm text-gray-500">
        Метка — текстовые метки через знак «;». Максимум 50 символов.
      </p>
      <div class="flex flex-col gap-3">
        <AccountForm
          v-for="account in store.accounts"
          :key="account.id"
          :account="account"
        />
      </div>
    </section>
  </main>
</template>
