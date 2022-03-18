import { createRouter , createWebHistory } from "vue-router";
import Container from "../views/layout/Container.vue";
import Register from "../views/Auth/Register.vue";
import Login from "../views/Auth/Login.vue";
import Dashboard from "../views/pages/Dashboard.vue";
import UserProfile from "../views/pages/UserProfile.vue";

const routes = [
    {
        path: "/",
        name: Container,
        component: Container
    },
    {
        path: "/login",
        name: Login,
        component: Login
    },
    {
        path: "/register",
        name: Register,
        component: Register
    },
    {
        path: "/dashboard",
        name: Dashboard,
        component: Dashboard
    },
    {
        path: "/userprofile",
        name: UserProfile,
        component: UserProfile
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router
