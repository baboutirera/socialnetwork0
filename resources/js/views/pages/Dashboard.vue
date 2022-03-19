<template>
    <div>
        <nav>
            <ul class="navigation">
                <li><a href="">Profile</a></li>
                <li><a href="">Setting</a></li>
                <li><a href="">My Book</a></li>
            </ul>
            <div class="button">
                <my-button @click="logout" v-if="loggedIn">Se déconnecter</my-button>
            </div>
        </nav>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex";

    export default {
        name: "Dashboard",
        data: () => ({ }),
        computed: {
            ...mapGetters({
                loggedIn: 'auth/loggedIn',
            })
        },
        methods: {
            ...mapActions({
                logout: 'auth/logout',
            })
        }
    }
</script>

<style scoped lang="scss">
    nav {
        margin: 30px;
        background-color: var(--color-gray-dark-1);
    }

    .navigation {
        list-style: none;
        float: left;

        li {
            display: inline-block;
            margin-left: 30px;

            &:first-child {
                margin: 0;
            }
        }
    }

    .button {
        float: right;
    }

</style>
