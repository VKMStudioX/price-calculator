import Multiselect from '@suadelabs/vue3-multiselect'
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css'
import { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.component('Multiselect', Multiselect)
}
