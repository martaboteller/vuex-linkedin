<template>
  <v-app>
    <v-toolbar app>
      <v-btn flat to="/">Students List</v-btn>
      <v-btn flat to="/NewStudent">New Student</v-btn>
    </v-toolbar>
    <v-content>
      <br />
      <router-view />
    </v-content>
    <v-snackbar v-model="$store.state.error.show">
      {{ $store.state.error.text }}
    </v-snackbar>
  </v-app>
</template>

<script>
import NewStudent from "./components/NewStudent";
import Students from "./components/Students";
import EditStudent from "./components/EditStudent";
import store from "./store.js";

export default {
  name: "App",
  components: {
    NewStudent,
    Students,
    EditStudent,
  },
  data() {
    return {};
  },
  async created() {
    //Access actions by dispatch('nameOfAction')
    this.$store.dispatch("getStudents");
  },
};
//methods
//Will always run the function whenever a re-render happens

//computed
//Properties that are cached based on their reactive dependencies
//Will only re-evaluate when some of its reactive dependencies have changed

//created
//Component charged, it is possible access to data and methods
//View not rendered can not access DOM
//Call APIs here

//mounted
//View rendered can do DOM changes

//updated
//Everytime the component changes or view changes

//destroyed
//When component is destroyed
//Ex: when hidden because of v-if
</script>
