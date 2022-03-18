import { createRouter , createWebHistory } from "vue-router";
import Container from "../views/layout/Container.vue";
import Register from "../views/Auth/Register.vue";
import Login from "../views/Auth/Login.vue";
import Dashboard from "../views/pages/Dashboard.vue";
import UserProfile from "../views/pages/UserProfile.vue";
import Middleware from "../middleware";
import store from "../store";
import middlewarePipeline from "./middlewarePipeline";

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
    },
    {
        path: "/register",
        name: Register,
        component: Register,
    },
    {
        path: "/dashboard",
        name: Dashboard,
        component: Dashboard,
        // meta: {
        //     middleware: [Middleware.auth]
        // },
    },
    {
        path: "/dashboard/userprofile",
        name: "dashboard.userprofile",
        component: UserProfile,
        // meta: {
        //     middleware: [Middleware.auth, Middleware.isSubscribed]
        // }
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
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })
})

export default router
