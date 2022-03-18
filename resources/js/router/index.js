import { createRouter , createWebHistory } from "vue-router";
import Container from "../views/layout/Container.vue";
import Register from "../views/Auth/Register.vue";
import Login from "../views/Auth/Login.vue";
import Dashboard from "../views/pages/Dashboard.vue";
import UserProfile from "../views/pages/UserProfile.vue";
import Middleware from "../middleware";
import store from "../store";

const routes = [
    {
        path: "/",
        name: Container,
        component: Container
    },
    {
        path: "/login",
        name: Login,
        component: Login,
        meta: {
            middleware: [Middleware.guest]
        }
    },
    {
        path: "/register",
        name: Register,
        component: Register,
        meta: {
            middleware: [Middleware.guest]
        }
    },
    {
        path: "/dashboard",
        name: Dashboard,
        component: Dashboard,
        meta: {
            middleware: [Middleware.auth]
        },
        children: [
            {
                path: "/userprofile",
                name: UserProfile,
                component: UserProfile,
                meta: {
                    middleware: [Middleware.auth, Middleware.isSubscribed]
                }
            },
        ]
    },

]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

router.beforeEach((to, from, next) => {

    if(!to.meta.middleware){
        return next()
    }

    const middleware = to.meta.middleware

    const context = {
        to,
        from,
        next,
        store
    }

    return middleware[0] ({
        ...context
    })
})

export default router
