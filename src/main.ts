import './assets/main.css'
import { createApp, h } from 'vue'
import App from './App.vue'
import Templates from "./views/Templates.vue"
import Template from "./views/Template.vue"
import CreateTemplate from "./views/CreateTemplate.vue"
import NotFound from "./views/NotFound.vue"
import { createRouter, createWebHistory, RouterView } from "vue-router"
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

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
        {
            path: "/:notFound",
            component: NotFound
        },
    ]
})

const app = createApp(App)
app.component("v-select", vSelect);
app.use(router)
app.mount('#app')