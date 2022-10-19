import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createHead } from '@vueuse/head'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const app = createApp(App)
const routes = setupLayouts(generatedRoutes)
export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (to, from, savedPosition) => {
    return new Promise((resolve) => {
      // Exists when Browser's back/forward pressed
      if (savedPosition) { return savedPosition }
      // For anchors
      else if (to.hash) { return { selector: to.hash } }
      // By changing queries we are still in the same component, so "from.path" === "to.path" (new query changes just "to.fullPath", but not "to.path").
      else if (from.path === to.path) { return {} }
      // scroll to top by default
      return setTimeout(() => {
        resolve({ left: 0, top: 0, behavior: 'smooth' })
      }, 100)
    })
  },
  routes,
})
app.use(router)

Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.({ app, router, routes }))

const head = createHead()
app.use(head)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.mount('#app')