import './assets/main.css'
import { createApp, h } from 'vue'
import App from './App.vue'
import Templates from "./views/Templates.vue"
import Template from "./views/Template.vue"
import CreateTemplate from "./views/CreateTemplate.vue"
import { createRouter, createWebHistory, RouterView } from "vue-router"

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: to => {
                // the function receives the target route as the argument
                // we return a redirect path/location here.
                return { path: '/templates' }
            },
        },
        { path: '/templates', component: { render: () => h(RouterView) }, children:
            [
                { path: '', name: 'templates', component: Templates},
                { path: '/templates/:id', name: 'view-template', component: Template }
            ]
        },
        {
            path: "/create",
            component: CreateTemplate
        },
    ]
})

createApp(App)
.use(router)
.mount('#app')