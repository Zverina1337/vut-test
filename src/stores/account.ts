import type { Account } from "@/types/account";
import { defineStore } from "pinia";
import { ref, watch, type Ref } from "vue";

export const useAccountStore = defineStore('account', () => {
  const accounts: Ref<Account[]> = ref(getState())

  function getState(): Account[] {
    const localStoragedAccounts = localStorage.getItem('accounts')
    if(localStoragedAccounts) {
     return [...JSON.parse(localStoragedAccounts)]
    }
    return []
  }

  function setState() {
    localStorage.setItem('accounts', JSON.stringify(accounts.value))
  }

  function deleteAccount(id: Account['id']) {
    accounts.value = accounts.value.filter((acc) => acc.id !== id)
  }

  function addAccount() {
    const newAccount: Account = {
      id: Date.now().toString(),
      login: '',
      password: '',
      type: 'Локальная',
      tags: []
    }

    accounts.value = [...accounts.value, newAccount]
  }

  function updateAccount(id: Account['id'], data: Partial<Omit<Account, 'id'>>) {
    const index = accounts.value.findIndex((acc) => acc.id === id)

    if(index !== -1 && accounts.value[index]) {
      accounts.value[index] = {...accounts.value[index], ...data}
    }
  }

  watch(accounts, () => setState(), { deep: true })

  return { accounts, deleteAccount, addAccount, updateAccount }
})