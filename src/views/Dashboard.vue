<template>
<v-app>
    <v-app-bar color="deep-purple accent-4" dense dark app>
        <v-app-bar-nav-icon class="nav-icon"  @click="drawer=true"></v-app-bar-nav-icon>

        <v-toolbar-title>پنل ادمین</v-toolbar-title>

        <v-spacer></v-spacer>
        <span>
            {{ time }}
        </span>

        <!-- <v-btn icon>
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
        </v-menu> -->
    </v-app-bar>
    <v-navigation-drawer app right v-model="drawer">
        <template #prepend>
            <v-list-item class="bg-user-info">
                <v-list-item-avatar >
                    <v-img src="https://avatars.githubusercontent.com/u/19605594?v=4" />
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>
                        {{ username }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        {{ email }}
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
                <router-link :to="{ name: 'Userinfo' }">
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>اطلاعات کاربری</v-list-item-title>
                    </v-list-item>
                </router-link>

                <router-link :to="{ name: 'Users' }">
                    <v-list-group :value="false" prepend-icon="mdi-account-multiple">
                        <template v-slot:activator>
                            <v-list-item-title>کاربران</v-list-item-title>
                        </template>
                        <router-link to="/dashboard/createuser">
                            <v-list-item class="mr-5">
                                <v-list-item-icon>
                                    <v-icon>mdi-account-plus</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>کاربر جدید</v-list-item-title>
                            </v-list-item>
                        </router-link>
                    </v-list-group>
                </router-link>
                <router-link to="/dashboard/posts">
                    <v-list-group :value="false" prepend-icon="mdi-file-multiple">
                        <template v-slot:activator>
                            <v-list-item-title>پست ها</v-list-item-title>
                        </template>

                        <v-list-item class="mr-5">
                            <v-list-item-icon>
                                <v-icon> mdi-file</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>پست ها</v-list-item-title>
                        </v-list-item>
                        <router-link to="/dashboard/createpost">
                            <v-list-item class="mr-5">
                                <v-list-item-icon>
                                    <v-icon>mdi-file-plus</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>پست جدید</v-list-item-title>
                            </v-list-item>
                        </router-link>
                        <router-link to="/dashboard/categories">
                            <v-list-item class="mr-5">
                                <v-list-item-icon>
                                    <v-icon>mdi-folder-multiple</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>دسته ها</v-list-item-title>
                            </v-list-item>
                        </router-link>
                        <router-link to="/dashboard/tags">
                            <v-list-item class="mr-5">
                                <v-list-item-icon>
                                    <v-icon>mdi-cards</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>برچسب ها</v-list-item-title>
                            </v-list-item>
                        </router-link>
                    </v-list-group>
                </router-link>
            </v-list-item-group>
        </v-list>

        <template #append>
            <div class="mx-4">
                <v-dialog v-model="dialogExit" max-width="500px" transition="dialog-bottom-transition">
                    <v-card>
                        <v-toolbar color="primary" dark>خروج</v-toolbar>
                        <v-card-title class="text-h6 p-5">قصد خروج از پنل مدیریت را دارید ؟</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDialog">نه بیخیال</v-btn>
                            <v-btn color="blue darken-1" text @click="exitConfirm">صد در صد</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-btn block class="mb-2" color="deep-purple" dark @click="deletetoken">
                    خروج
                </v-btn>
            </div>
        </template>
    </v-navigation-drawer>
    <v-main>
        <v-alert v-if="this.$store.state.alert_message.text" transition="scale-transition" dense :type="this.$store.state.alert_message.type">
            {{ this.$store.state.alert_message.text }}
        </v-alert>
         <transition name="fade" mode="out-in">
        <router-view />
        </transition>
    </v-main>
    <v-footer padless>
        <v-col class="text-center" cols="12">
            {{ new Date().getFullYear() }} —
            <strong>vuetify wordpress admin panel ;)</strong>
        </v-col>
    </v-footer>
</v-app>
</template>

<script>
var moment = require("jalali-moment");
export default {
    data: () => ({
        drawer: true,
        group: null,
        username: window.localStorage.getItem("displayname"),
        email: window.localStorage.getItem("email"),
        success: false,
        error: false,
        time: null,
        dialogExit: false,
    }),

    methods: {
        deletetoken() {

            this.dialogExit = true
        },
        closeDialog() {

            this.dialogExit = false
        },
        exitConfirm() {

            localStorage.removeItem("userToken");
            this.$router.push({
                name: "Login",
            });
        },
        currentDateTime() {
            this.time = moment().locale("fa").format(" h:mm:ss a , YYYY/M/D");

            // return
        },
    },
    computed : {

    // mobile(){
    //     if (window.innerWidth <= '992px')
    //     return true
    // }

    },
    created() {
        // setInterval( function(){
        //     this.currentDateTime() }
        //       , 1000)

        this.currentDateTime();

        setInterval(this.currentDateTime, 1000);
    },
};
</script>

<style>
a {
    text-decoration: none;
}
/* .bg-user-info{
    background: #6200ea;
    color:white!important;
} */
@media(min-width : 992px){
    .nav-icon{
        display: none!important;
    }
}
</style>
