<template>
    <div>
        <div class="topHeader mx-5">
            <img class="TGIFLOGO" alt="TGIF Logo" src="../assets/TGIF_Logo_ok.png">
            <a href="mailto: info@tgif.net">
            <b-icon icon="envelope" variant="secondary" font-scale="2.7"/>
            </a>
        </div>
        <div>
            <b-navbar toggleable="md" variant="dark">
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="dflex justify-content-center align-items-center">
                    <router-link to="/" class="HomeText">Home</router-link>
                    <b-nav-item-dropdown variant="success">
                        <template v-slot:button-content>
                            <strong class="dropText">Congress 113</strong>
                        </template>
                        <router-link class="linkText" to="/senate">Senate</router-link>
                        <b-dropdown-divider></b-dropdown-divider>
                        <router-link class="linkText" to="/house">House</router-link>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown>
                        <template v-slot:button-content>
                            <strong class="dropText">Attendance</strong>
                        </template>
                        <router-link class="linkText" to="/attendancesenate">Senate</router-link>
                        <b-dropdown-divider></b-dropdown-divider>
                        <router-link class="linkText" to="/attendancehouse">House</router-link>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown class="dflex">
                        <template v-slot:button-content>
                            <strong class="dropText">Party Loyalty</strong>
                        </template>
                        <router-link class="linkText" to="/loyaltysenate">Senate</router-link>
                        <b-dropdown-divider></b-dropdown-divider>
                        <router-link class="linkText" to="/loyaltyhouse">House</router-link>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderPage'
}
</script>

<style scoped>
.TGIFLOGO {
    width: 100px;
    margin: 1.6% 4%;
}
.topHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
a {
    margin: 0 4% ;
}
.linkText {
    font-weight: bold;
    color: darkslategray
}
.HomeText {
    font-weight: bold;
    color: white
}
.dropText {
    font-weight: bold;
    color: white
}
.navBar {
 position: sticky;
 top: 0;
 position: -webkit-sticky;
}
</style>