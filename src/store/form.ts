import { acceptHMRUpdate, defineStore } from 'pinia'

export interface FormData {
  description: string | null
  sendConfirmation: string | null
  vat: string | null
  priceNettoEur: string | null
  priceBruttoEur: string | null
}

interface FormState {
  formData: FormData[]
}

export const useFormStore = defineStore('form', {
  state(): FormState {
    return {
      formData: [],
    }
  },
  actions: {
   saveFormData(formData) {
      this.formData = formData
    },
  },
  getters: {
    getFormData: (state: FormState) => state.formData && state.formData,
  },
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useFormStore, import.meta.hot))
