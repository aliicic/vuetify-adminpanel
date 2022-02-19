<template>
<v-app>

    <v-app-bar color="deep-purple accent-4" dense dark app>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>پنل ادمین</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-menu left bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item v-for="n in 5" :key="n" @click="() => {}">
                    <v-list-item-title>Option {{ n }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
    <v-navigation-drawer app right v-model="drawer">
        <template #prepend>
            <v-list-item>
                <v-list-item-avatar>
                    <v-img src="https://avatars.githubusercontent.com/u/19605594?v=4" />
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>
                        علی آقاخانی
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        مدیر سایت
                    </v-list-item-subtitle>
                </v-list-item-content>

            </v-list-item>
        </template>
        <v-list nav dense>
            <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
                <router-link to="/dashboard">
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>داشبورد</v-list-item-title>
                    </v-list-item>
                </router-link>
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>اطلاعات کاربری</v-list-item-title>
                </v-list-item>
                <router-link :to="{ name :'Users'}">
                    <v-list-group :value="false" prepend-icon="mdi-account-circle">
                        <template v-slot:activator>
                            <v-list-item-title>کاربران</v-list-item-title>
                        </template>
                        <router-link to="/dashboard/createuser">
                            <v-list-item class="mr-5">
                                <v-list-item-icon>
                                    <v-icon>mdi-view-dashboard</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>کاربر جدید</v-list-item-title>
                            </v-list-item>
                        </router-link>
                    </v-list-group>
                </router-link>
                <router-link to="/dashboard/posts">
                    <v-list-group :value="false" prepend-icon="mdi-account-circle">

                        <template v-slot:activator>
                            <v-list-item-title>پست ها</v-list-item-title>
                        </template>

                        <v-list-item class="mr-5">
                            <v-list-item-icon>
                                <v-icon>mdi-view-dashboard</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>پست ها</v-list-item-title>
                        </v-list-item>
                        <router-link to="/dashboard/createpost">
                            <v-list-item class="mr-5">
                                <v-list-item-icon>
                                    <v-icon>mdi-view-dashboard</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>پست جدید</v-list-item-title>
                            </v-list-item>
                        </router-link>
                        <router-link to="/dashboard/categories">
                            <v-list-item class="mr-5">
                                <v-list-item-icon>
                                    <v-icon>mdi-view-dashboard</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>دسته ها</v-list-item-title>
                            </v-list-item>
                        </router-link>
                        <router-link to="/dashboard/tags">
                            <v-list-item class="mr-5">
                                <v-list-item-icon>
                                    <v-icon>mdi-view-dashboard</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>برچسب ها</v-list-item-title>
                            </v-list-item>
                        </router-link>
                    </v-list-group>
                </router-link>
            </v-list-item-group>
        </v-list>

        <template #append>
            <div class=" mx-4 ">
                <v-btn block class="mb-2" color="grey darken-4" dark @click="deletetoken">
                    خروج
                </v-btn>
            </div>

        </template>

    </v-navigation-drawer>

    <v-main>
        <router-view />
    </v-main>
    <v-footer padless>
        <v-col class="text-center" cols="12">
            {{ new Date().getFullYear() }} — <strong>powered by Javascript</strong>
        </v-col>
    </v-footer>
</v-app>
</template>

<script>
export default {
    data: () => ({
        drawer: true,
        group: null,
    }),

    methods: {

        deletetoken() {

            localStorage.removeItem('userToken')
            this.$router.push({
                name: "Login"
            })

        }

    }
    // beforeRouteEnter(to, from, next) {

    //   next({ path: '/' })
    // }
}
</script>

<style>
a {
    text-decoration: none;
}
</style>
